import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { Portafolio } from 'src/app/models/portafolio';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ArbolService } from 'src/app/services/arbol.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ImageService } from 'src/app/services/image.service';

interface Patrocinador {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  public usuario: Usuario;
  public error: boolean;
  public disabled: boolean = false;

  public patrocinadores = new Array<Usuario>();

  public id:number | undefined;

  public estado: boolean=true;

  public posicionNueva!: string;

  public image: any;
  public progressFrente: number = 0;
  public progressDorso: number = 0;
  
  constructor(
    private usuariosService: UsuariosService,
    private arbolService: ArbolService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {id:number},
    private imageService: ImageService
  ) {
    this.usuario = new Usuario();
    this.error = false;
    this.id=this.data.id;
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(
      response => {
        this.patrocinadores = response;
      }
    )
  }

  posiciones: string[] = ['Izquierda','Derecha'];

  // portafolioList: string[] = ['Free','Base','Medio','Plus','Mega','Extra','Full'];

  // Verifica si el username existe
  verificarUsuario(){
    this.disabled = false;
    this.usuariosService.verificarUsuario(this.usuario).subscribe(
      response => {
        if(response.length === 0){
          // console.log('Username libre');
          this.error = false;
        }else{
          // console.log('Username en uso');
          this.error = true;
        }
      }
    )
  }

  comprobarUsuario(){
    if(this.usuario.username == undefined){
      this.disabled = true;
    }else{
      this.enviarDatos();
    }
  }

  // Submit form
  enviarDatos(){
    
    console.log(this.usuario);
    // console.log('patrocinador: ' + this.id);
    this.usuario.registro = (this.id == undefined) ? "Directo" : "Asociado";
    let idPatrocinador = (this.id == undefined) ? undefined : this.id;
    this.usuariosService.postUsuario(this.usuario).subscribe(
      response => {
        // console.log(response);
        this.posicionNueva = this.usuario.posicion;
        this.usuario = response;
        // User created successfully
        this.dialog.open(
          ModalComponent,
          {
            width: '100%',
            data: {
              user: response,
              idPatrocinador: idPatrocinador
            }
          }
        );
        if(this.id == undefined){
          // Log in User
          setTimeout(()=>{
            localStorage.setItem('currentUser',JSON.stringify(this.usuario));
            this.dialog.closeAll();
          }, 2500);
        }else{
          // console.log('indefinido')
          this.asociar();
        }
      }
    )

  }

  asociar(){
    let arbol = {
      patrocinador: this.id,
      patrocinado: this.usuario.id,
      posicion: this.posicionNueva
    };

    // console.log(arbol);

    this.arbolService.postArbol(arbol).subscribe(
      () => {
        this.estado = false;
      }
    )
  }


  readThis(event: any,tipo: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      this.image = myReader.result;
      let image = {
        "encodedImage": this.image
      };

      // console.log(image)
      this.imageService.uploadImage(image).subscribe(

        (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if(tipo == 'frente'){this.progressFrente = Math.round(event.loaded / event.total * 100)}
              if(tipo == 'dorso'){this.progressDorso = Math.round(event.loaded / event.total * 100)}
              break;
            case HttpEventType.Response:
              if(tipo == 'frente'){
                this.usuario.url_documento_frente = event.body.data
                this.progressFrente = 0
              }
              if(tipo == 'dorso'){
                this.usuario.url_documento_dorso = event.body.data
                this.progressDorso = 0
              }
              // console.log(this.usuario)
          }
        }


      )
    }
  }
}
