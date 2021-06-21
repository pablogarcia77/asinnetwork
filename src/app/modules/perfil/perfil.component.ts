import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faAddressCard, faEnvelope, faHome, faKey, faMoneyCheckAlt, faPhone, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  faUser = faUser;
  faKey = faKey;
  faAddressCard = faAddressCard;
  faEnvelope = faEnvelope;
  faHome = faHome;
  faPhone = faPhone;
  faUniversity = faUniversity;
  faMoney = faMoneyCheckAlt;

  public usuario: Usuario;

  public usuarioActualizado!: Usuario;

  public error: boolean = false;
  public exito: boolean = false;

  public oldPassword!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private usuarioService: UsuariosService
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '');
    this.oldPassword = this.usuario.password;
  }

  openDialogTemplate(template: TemplateRef<any>){
    this.usuarioActualizado = new Usuario();
    this.dialog.open(template);
  }

  actualizarPerfil(){
    if(this.oldPassword === this.usuarioActualizado.password){
      this.usuarioService.putUsuario(this.usuario).subscribe(
        () => {
          this.exito = true;
          this.error = false;
        }
      )
      setTimeout(() => {
        this.logOut();
        this.dialog.closeAll();
        this.router.navigate(['/']);
      }, 2000);
    }else{
      this.error = true;
    }
  }

  borrar(){
    this.usuario.password = '';
  }

  volver(){
    this.usuario.password = (this.usuario.password == '') ? this.oldPassword : this.usuario.password;
  }

  logOut(){
    localStorage.setItem('currentUser','');
  }

}
