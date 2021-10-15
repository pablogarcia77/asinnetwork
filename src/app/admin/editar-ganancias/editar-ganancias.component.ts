import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { Ganancia } from 'src/app/models/ganancia';
import { Rango } from 'src/app/models/rango';
import { Usuario } from 'src/app/models/usuario';
import { GananciasService } from 'src/app/services/ganancias.service';
import { RangosService } from 'src/app/services/rangos.service';

@Component({
  selector: 'app-editar-ganancias',
  templateUrl: './editar-ganancias.component.html',
  styleUrls: ['./editar-ganancias.component.css']
})
export class EditarGananciasComponent implements OnInit {

  public usuario: Usuario;

  @Input() user: any;

  public ganancia!: Ganancia;

  constructor(
    @Optional()@Inject(MAT_DIALOG_DATA)
    public data: {usuario: Usuario},
    private gananciasService: GananciasService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.usuario = new Usuario();
    this.ganancia = new Ganancia();
  }

  ngOnInit(): void {
    // this.usuario = this.data.usuario
    this.usuario = this.user;
    // console.log(this.usuario)
    
  }

  editarGanancias(){
    // console.log(this.ganancia)

    // console.log(this.selectedValue)

    this.gananciasService.postGanancia(this.usuario.id,this.ganancia).subscribe(
      response => {
        this.snackbar.open(
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

    // this.rangosService.postGanancia(this.data.usuario.id,this.selectedValue.id).subscribe(
    //   response => {
    //     console.log(response)
    //   }
    // )
    // this.gananciasService.postGanancia(this.usuario.id,this.ganancia).subscribe(
    //   response => {
    //     // console.log(response)
    //     this.snackbar.open(
    //       'Datos guardados','Aceptar',
    //       {
    //         duration: 1500
    //       }
    //     )
    //     setTimeout(() => {
    //       this.dialog.closeAll();
    //     }, 1500);
    //   }
    // )
  }

}
