import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Puntos } from 'src/app/models/puntos';
import { Usuario } from 'src/app/models/usuario';
import { PuntosService } from 'src/app/services/puntos.service';

@Component({
  selector: 'app-gestion-puntos',
  templateUrl: './gestion-puntos.component.html',
  styleUrls: ['./gestion-puntos.component.css']
})
export class GestionPuntosComponent implements OnInit {

  @Input() user: Usuario
  @Input() historicoIzquierda: number
  @Input() historicoDerecha: number

  public puntos: Puntos
  
  constructor(
    private puntosService: PuntosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.puntos = new Puntos()
  }

  ngOnInit(): void {
  }
  
  actualizarPuntos(){
    // console.log(this.puntos)
    // console.log(this.historicoDerecha)
    // console.log(this.historicoIzquierda)
    this.puntos.historico_derecha = this.historicoDerecha - this.puntos.derecha
    this.puntos.historico_izquierda = this.historicoIzquierda - this.puntos.izquierda
    // console.log(this.puntos)
    this.puntosService.postPuntosByUser(this.user,this.puntos).subscribe(
      response => {
        if(response){
          this.snackBar.open("Puntos actualizados","Aceptar",{duration:1500})
        }else{
          this.snackBar.open("Intente nuevamente","Aceptar",{duration:1500})
        }
        this.dialog.closeAll()
      }
    )
  }

}
