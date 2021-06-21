import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faAddressCard, faEnvelope, faHome, faKey, faMoneyCheckAlt, faPhone, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  // Iconos
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

  public exito!: boolean;
  public error!: boolean;
  public oldPassword!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {usuario : Usuario},
    public dialog: MatDialog,
    private usuarioService: UsuariosService
  ) {
    this.usuario = new Usuario();
    this.usuario = this.data.usuario
  }

  ngOnInit(): void {
    this.oldPassword = JSON.parse(localStorage.getItem('currentUser') || '').password;
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
        this.dialog.closeAll();
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
}
