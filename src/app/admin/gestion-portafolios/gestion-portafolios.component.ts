import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Portafolio } from 'src/app/models/portafolio';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { NuevoPortafolioComponent } from '../nuevo-portafolio/nuevo-portafolio.component';

@Component({
  selector: 'app-gestion-portafolios',
  templateUrl: './gestion-portafolios.component.html',
  styleUrls: ['./gestion-portafolios.component.css']
})
export class GestionPortafoliosComponent implements OnInit {


  public portafolios: Array<Portafolio>

  public selected!: Portafolio

  public exito: boolean = false

  public error: boolean = false
  
  constructor(
    private portafolioService: PortafolioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.portafolios = new Array<Portafolio>();
    this.selected = new Portafolio();
    this.selected.id = 0
  }

  ngOnInit(): void {
    this.cargarPortafolios()
    console.log(this.selected)
  }

  cargarPortafolios(){
    this.portafolioService.getPortafolios().subscribe(
      response => {
        this.portafolios = response;
      }
    )
  }

  openDialogTemplate(template: TemplateRef<any>){
    this.portafolioService.updatePortafolio(this.selected).subscribe(
      response => {
        this.exito = response
        this.error = !response
        this.dialog.open(template);
      }
    )
  }

  openDialogTDelete(template: TemplateRef<any>){
    this.dialog.open(template)
  }

  deletePortafolio(){
    this.portafolioService.deletePortafolio(this.selected).subscribe(
      response => {
        console.log(response)
        this.snackBar.open("Portafolio Eliminado Correctamente","Aceptar",{duration:1500})
      }
    )
    this.cargarPortafolios()
    this.selected.id = 0
  }

  nuevoPortafolio(){
    this.dialog.open(
      NuevoPortafolioComponent
    )
  }

}
