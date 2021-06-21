import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
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
        if(response){
          this.usuario = response[0];
          // console.log(this.usuario)
          localStorage.setItem('currentUser',JSON.stringify(this.usuario));
            this.router.navigate(['panel']);
          this.dialog.closeAll();
        }else{
          this.error = true;
        }
      }
    )
  }

}
