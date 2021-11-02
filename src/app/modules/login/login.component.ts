import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Iconos
  faUser = faUser;
  faKey = faKey;

  public usuario: Usuario;
  public error: boolean;
  public mensajeError: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){
    this.usuario = new Usuario();
    this.error = false;
  }

  ngOnInit(): void {
  }

  login(){
    // console.log('login');
    // console.log(this.usuario.username);
    // console.log(this.usuario.password);
    this.loginService.getUsuario(this.usuario).subscribe(
      response => {
        if(response.ok == false){
          this.error = true
          this.mensajeError = response.mensaje
          // console.log('hay error')
        }else{
          this.usuario = response;
          // console.log(this.usuario)
          if(this.usuario.bloqueado == '1'){
            this.snackBar.open("Usuario Bloqueado, contacte al administrador!","Aceptar",{duration:1500})
          }else{
            localStorage.setItem('currentUser',JSON.stringify(this.usuario));
            this.router.navigate(['panel']);
            this.dialog.closeAll();
          }
        }
      }
    )
  }

}
