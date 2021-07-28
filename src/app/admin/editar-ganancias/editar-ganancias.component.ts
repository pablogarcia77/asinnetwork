import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ganancia } from 'src/app/models/ganancia';
import { Usuario } from 'src/app/models/usuario';
import { GananciasService } from 'src/app/services/ganancias.service';

@Component({
  selector: 'app-editar-ganancias',
  templateUrl: './editar-ganancias.component.html',
  styleUrls: ['./editar-ganancias.component.css']
})
export class EditarGananciasComponent implements OnInit {

  public usuario: Usuario;

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
    this.usuario = this.data.usuario
    // console.log(this.usuario)
  }

  editarGanancias(){
    // console.log(this.ganancia)
    this.gananciasService.postGanancia(this.usuario.id,this.ganancia).subscribe(
      response => {
        // console.log(response)
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
  }

}
