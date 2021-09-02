import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Portafolio } from 'src/app/models/portafolio';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-nuevo-portafolio',
  templateUrl: './nuevo-portafolio.component.html',
  styleUrls: ['./nuevo-portafolio.component.css']
})
export class NuevoPortafolioComponent implements OnInit {

  public portafolio: Portafolio

  constructor(
    private portafoliosService: PortafolioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.portafolio = new Portafolio()
  }

  ngOnInit(): void {
  }

  crearPortafolio(){
    this.portafoliosService.postPortafolio(this.portafolio).subscribe(
      response => {
        if(response){
          this.snackBar.open('Portafolio creado correctamente.','Aceptar',{duration: 1500})
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente.','Aceptar',{duration: 1500})
        }
        this.dialog.closeAll()
      }
    )
  }
}
