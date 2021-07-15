import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Arbol } from 'src/app/models/arbol';
import { Portafolio } from 'src/app/models/portafolio';
import { Usuario } from 'src/app/models/usuario';
import { ArbolService } from 'src/app/services/arbol.service';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { forkJoin } from 'rxjs';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-portafolio-usuario',
  templateUrl: './portafolio-usuario.component.html',
  styleUrls: ['./portafolio-usuario.component.css']
})
export class PortafolioUsuarioComponent implements OnInit {

  public portafolios: Array<Portafolio>
  public selectedValue1!: number;
  public selectedValue2!: number;
  public selectedValue3!: number;
  public numeros!: Array<number>;
  public usuario!: Usuario;
  public p1!: Portafolio;
  public p2!: Portafolio;
  public p3!: Portafolio;
  public semana1!: number;
  public semana2!: number;
  public semana3!: number;
  public arbol!: Arbol;
  public actualizado: boolean=false;

  public picker1!: MatDatepicker<Date>;
  public picker2!: any;
  public picker3!: any;

  public f1!: Date;
  public f2!: Date;
  public f3!: Date;

  
  constructor(  
    private portafolioService: PortafolioService,
    @Inject(MAT_DIALOG_DATA)
    public data: {usuario: Usuario},
    private arbolService: ArbolService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.portafolios = new Array<Portafolio>();
    this.numeros = [1,2,3];
    this.usuario = new Usuario();
    this.usuario = data.usuario;
  }

  ngOnInit(): void {
    this.portafolioService.getPortafolios().subscribe(
      response => {
        // console.log(response)
        this.portafolios = response;
      }
    )

    this.portafolioService.getPortafoliosArbol(this.usuario).subscribe(
      resp => {
        // console.log(resp);
        this.semana1 = (resp[0].s1) ? resp[0].s1 : null
        this.semana2 = (resp[0].s2) ? resp[0].s2 : null
        this.semana3 = (resp[0].s3) ? resp[0].s3 : null
        this.selectedValue1 = (resp[0].p1) ? resp[0].p1 : null
        this.selectedValue2 = (resp[0].p2) ? resp[0].p2 : null
        this.selectedValue3 = (resp[0].p3) ? resp[0].p3 : null
      }
    )

    this.arbolService.getMiArbol(this.usuario).subscribe(
      response => {
        // console.log(response)
        this.arbol=response[0];
      }
    )
  }

  actualizarPortafolios(){
 
    // console.log(this.selectedValue1)

    const getPorta1 = this.portafolioService.getPortafolio(this.selectedValue1)
    const getPorta2 = this.portafolioService.getPortafolio(this.selectedValue2)
    const getPorta3 = this.portafolioService.getPortafolio(this.selectedValue3)

    forkJoin([getPorta1,getPorta2,getPorta3]).subscribe(
      res => {
        this.p1 = res[0][0];
        this.p2 = res[1][0];
        this.p3 = res[2][0];
      }
    )

    setTimeout(() => {
      this.actualizarArbol()
    }, 1000);
  }

  actualizarArbol(){
    if(this.p1){
      this.arbol.p1 = this.p1.id;
      this.arbol.fecha_p1 = this.f1;
      this.arbol.s1 = this.semana1;
      this.arbol.precio_p1 = this.p1.precio;
      this.arbol.porcentaje_p1 = this.p1.porcentaje;
      this.arbol.puntos_p1 = this.p1.puntos;
    }
    if(this.p2){
      this.arbol.p2 = this.p2.id;
      this.arbol.fecha_p2 = this.f2;
      this.arbol.s2 = this.semana2;
      this.arbol.precio_p2 = this.p2.precio;
      this.arbol.porcentaje_p2 = this.p2.porcentaje;
      this.arbol.puntos_p2 = this.p2.puntos;
    }
    if(this.p3){
      this.arbol.p3 = this.p3.id;
      this.arbol.fecha_p3 = this.f3;
      this.arbol.s3 = this.semana3;
      this.arbol.precio_p3 = this.p3.precio;
      this.arbol.porcentaje_p3 = this.p3.porcentaje;
      this.arbol.puntos_p3 = this.p3.puntos;
    }
    this.arbolService.putArbol(this.arbol).subscribe(
      () => {
        this.actualizado = true;
        this.snackBar.open(
          'Datos guardados','Aceptar',
          {
            duration: 1500
          }
        )
        setTimeout(() => {
          this.dialog.closeAll();
        }, 1500);
      }
    )

  }
}
