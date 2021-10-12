import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Portafolio } from 'src/app/models/portafolio';
import { ImageService } from 'src/app/services/image.service';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-nuevo-portafolio',
  templateUrl: './nuevo-portafolio.component.html',
  styleUrls: ['./nuevo-portafolio.component.css']
})
export class NuevoPortafolioComponent implements OnInit {

  public portafolio: Portafolio
  public image: any;

  public progress: number = 0;


  constructor(
    private portafoliosService: PortafolioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private imageService: ImageService
  ) {
    this.portafolio = new Portafolio()
  }

  ngOnInit(): void {
  }

  crearPortafolio(){
    this.portafoliosService.postPortafolio(this.portafolio).subscribe(
      response => {
          (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100)
              break;
            case HttpEventType.Response:

              console.log(event.body.data)
                // this.usuario.url_documento_dorso = event.body.data
              this.progress = 0
              
              // console.log(this.usuario)
          }
        }
        if(response){
          this.snackBar.open('Portafolio creado correctamente.','Aceptar',{duration: 1500})
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente.','Aceptar',{duration: 1500})
        }
        this.dialog.closeAll()
      }
    )
  }


  readThis(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      this.image = myReader.result;
      this.portafolio.encodedImage = this.image

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
