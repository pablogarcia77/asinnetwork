import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Portafolio } from 'src/app/models/portafolio';
import { Usuario } from 'src/app/models/usuario';
import { ArbolService } from 'src/app/services/arbol.service';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.css']
})
export class AsociarComponent implements OnInit {

  patrocinado = new FormControl();
  public usuarios: Array<Usuario>;
  filteredOptions!: Observable<any>;
  public usuario!: Usuario;
  public portafolioList = new Array<Portafolio>();
  public portafoliosSeleccionados: Array<Portafolio>;
  public posicionNueva!: string;
  public posiciones: string[] = ['Izquierda','Derecha'];
  faUser = faUser;
  public estado: boolean = true;
  
  constructor(
    private usuariosService: UsuariosService,
    private arbolService: ArbolService,
    public dialog: MatDialog,
  ) {
    this.usuarios = new Array<Usuario>();
    this.portafoliosSeleccionados = new Array<Portafolio>();
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.usuariosService.getUsuarios().subscribe(
      response => {
        this.usuarios = response;
      }
    )

    this.filteredOptions = this.patrocinado.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: any): Array<Usuario> {
    // const filterValue = value.toLowerCase();

    return this.usuarios.filter(
      usuario => usuario.username.indexOf(value) === 0
      );
  }

  getOptionText(usuario: any) {
    return (usuario) ? usuario.username : null;
  }

  openDialogTemplate(template: TemplateRef<any>){
    this.dialog.open(template);
  }

  asociar(){
    let arbol = {
      patrocinador: this.usuario.id,
      patrocinado: this.patrocinado.value.id,
      posicion: this.posicionNueva
    };

    console.log(arbol);

    this.arbolService.postArbol(arbol).subscribe(
      () => {
        this.estado = false;
      }
    )
  }

  nuevoUsuario(){
    this.dialog.open(
      RegistroComponent,
      {
        data: {
          id: this.usuario.id
        },
        width: '100%',
      }
    )
  }



}
