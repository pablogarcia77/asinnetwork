import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rango } from 'src/app/models/rango';
import { RangosService } from 'src/app/services/rangos.service';

@Component({
  selector: 'app-gestion-rangos',
  templateUrl: './gestion-rangos.component.html',
  styleUrls: ['./gestion-rangos.component.css']
})
export class GestionRangosComponent implements OnInit {

  public rangos: Array<Rango>

  public selected: Rango

  public rango: Rango

  public progress: number = 0

  public image: any

  constructor(
    private rangosService: RangosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.rangos = new Array<Rango>()
    this.selected = new Rango()
    this.selected.id = 0
    this.rango = new Rango()
  }

  ngOnInit(): void {
    this.cargarRangos()
  }

  cargarRangos(){
    this.rangosService.getRangos().subscribe(
      response => {
        this.rangos = response
      }
    )
  }

  openDialogT(template: TemplateRef<any>){
    this.dialog.open(template)
  }

  deleteRango(){
    this.rangosService.deleteRango(this.selected.id).subscribe(
      response => {
        if (response){
          this.snackBar.open("Rango eliminado","Aceptar",{duration:1500})
          this.cargarRangos()
        }
      }
    )
  }

  nuevoRango(){
    this.rangosService.postRango(this.rango).subscribe(
      () => {
        this.snackBar.open("Rango creado","Aceptar",{duration:1500}).afterDismissed().subscribe(
          () => this.cargarRangos()
        )
      }
    )
  }

  readThis(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      this.image = myReader.result;
      this.rango.encodedImage = this.image

      // console.log(image)
      // this.portafoliosService.postPortafolio(image).subscribe(

      //   (event: HttpEvent<any>) =>{
      //     switch (event.type) {
      //       case HttpEventType.UploadProgress:
      //         this.progress = Math.round(event.loaded / event.total * 100)
      //         break;
      //       case HttpEventType.Response:

      //         console.log(event.body.data)
      //           // this.usuario.url_documento_dorso = event.body.data
      //         this.progress = 0
              
      //         // console.log(this.usuario)
      //     }
      //   }


      // )
    }
  }
}
