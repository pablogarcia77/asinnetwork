import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Portafolio } from 'src/app/models/portafolio';
import { Usuario } from 'src/app/models/usuario';
import { ArbolService } from 'src/app/services/arbol.service';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-unirme',
  templateUrl: './unirme.component.html',
  styleUrls: ['./unirme.component.css']
})
export class UnirmeComponent implements OnInit {

  patrocinador = new FormControl();

  filteredOptions!: Observable<any>;

  public usuarios: Array<Usuario>;

  public usuario!: Usuario;

  public portafolioList = new Array<Portafolio>();

  // public usuario: Usuario;

  public portafoliosSeleccionados: Array<Portafolio>;

  public unirmeForm: any;

  posiciones: string[] = ['Izquierda','Derecha'];

  public posicionNueva: string | undefined;

  public estado: boolean = true;

  // Iconos
  faUser = faUser;



  constructor(
    private portafoliosService: PortafolioService,
    private usuariosService: UsuariosService,
    private arbolService: ArbolService,
    public dialog: MatDialog,
  ) {
    // this.usuario = new Usuario();
    this.portafoliosSeleccionados = new Array<Portafolio>();
    this.usuarios = new Array<Usuario>();
  }

  ngOnInit(): void {

    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}')[0];

    this.usuariosService.getUsuarios().subscribe(
      response => {
        this.usuarios = response;
        console.log(this.usuarios);
      }
    )

    this.filteredOptions = this.patrocinador.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.portafoliosService.getPortafolios().subscribe(
      response => {
        this.portafolioList = response;
      }
    )
  }

  private _filter(value: any): Array<Usuario> {
    // const filterValue = value.toLowerCase();

    return this.usuarios.filter(
      usuario => usuario.username.indexOf(value) === 0
      );
  }

  nuevo(){
    let arbol = {
      patrocinador: this.patrocinador.value.id,
      p1: this.portafoliosSeleccionados[0],
      p2: (this.portafoliosSeleccionados[1]) ? this.portafoliosSeleccionados[1] : null,
      p3: (this.portafoliosSeleccionados[2]) ? this.portafoliosSeleccionados[2] : null,
      patrocinado: this.usuario.id,
      posicion: this.posicionNueva
    };

    console.log(arbol);

    this.arbolService.postArbol(arbol).subscribe(
      () => {
        this.estado = false;
      }
    )
  }

  setPatrocinador(usuario: any){
    this.patrocinador = usuario.id;
  }

  openDialogTemplate(template: TemplateRef<any>){
    this.dialog.open(template);
  }
  getOptionText(usuario: any) {
    return usuario.username;
  }

}
