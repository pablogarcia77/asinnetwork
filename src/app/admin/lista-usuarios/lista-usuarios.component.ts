import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { MiredComponent } from 'src/app/modules/mired/mired.component';
import { ModalUsuarioComponent } from 'src/app/modules/modal-usuario/modal-usuario.component';
import { PerfilComponent } from 'src/app/modules/perfil/perfil.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DocumentoUsuarioComponent } from '../documento-usuario/documento-usuario.component';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { PortafolioUsuarioComponent } from '../portafolio-usuario/portafolio-usuario.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public usuario: Usuario;
  public usuarioEliminar!: Usuario;
  displayedColumns: string[] = ['username', 'apellido', 'nombre', 'documento', 'telefono','registro','acciones'];
  public dataSource : MatTableDataSource<Usuario>;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = new Usuario();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.cargarTabla();
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '');
  }

  cargarTabla(){
    this.usuariosService.getUsuarios().subscribe(
      response => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verUsuario(usuario: Usuario){
    this.dialog.open(
      ModalUsuarioComponent,
      {
        data: {usuario},
      }
    )
  }

  editarUsuario(usuario: Usuario){
    this.dialog.open(
      EditarUsuarioComponent,
      {
        data: {usuario},
        width: '100%'
      }
    )
  }

  stateUsuario(usuario: Usuario){
    let estado = (usuario.estado == "1") ? "0" : "1";
    let mensaje = (estado == "0") ? "Usuario Bloqueado" : "Usuario Desbloqueado";
    this.usuariosService.stateUsuario(usuario,estado).subscribe(
      () => {
        this.cargarTabla();
        this.openSnackBar(mensaje);
      }
    )
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(
      mensaje,
      "Aceptar",
      {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      }
    );
  }

  agregarPortafolioUsuario(usuario: Usuario){
    this.dialog.open(
      PortafolioUsuarioComponent,
      {
        data: {
          usuario: usuario
        },
        width: '60%'
      }
    )
  }

  deleteUser(template: TemplateRef<any>, usuario: Usuario){
    this.dialog.open(template)
    this.usuarioEliminar = usuario
  }

  deleteUsuario(){
    this.usuariosService.deleteUsuario(this.usuarioEliminar).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  verRed(usuario: Usuario){
    this.dialog.open(
      MiredComponent,
      {
        data: {
          usuario: usuario
        },
        width: '100%',
      }
    )
  }

  verDocumento(usuario: Usuario){
    this.dialog.open(
      DocumentoUsuarioComponent,
      {
        data: {
          usuario: usuario
        },
        width: '100%'
      }
    )
  }

}
