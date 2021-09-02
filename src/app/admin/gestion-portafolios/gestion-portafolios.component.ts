import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog
  ) {
    this.portafolios = new Array<Portafolio>();
    this.selected = new Portafolio();
  }

  ngOnInit(): void {
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

  nuevoPortafolio(){
    this.dialog.open(
      NuevoPortafolioComponent
    )
  }

}
