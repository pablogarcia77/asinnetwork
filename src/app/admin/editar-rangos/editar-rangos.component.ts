import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rango } from 'src/app/models/rango';
import { Usuario } from 'src/app/models/usuario';
import { RangosService } from 'src/app/services/rangos.service';

@Component({
  selector: 'app-editar-rangos',
  templateUrl: './editar-rangos.component.html',
  styleUrls: ['./editar-rangos.component.css']
})
export class EditarRangosComponent implements OnInit {

  public usuario: Usuario;

  public rangos!: Array<Rango>;

  public selectedValue!: Rango;
  
  constructor(
    private rangosService: RangosService,
    @Optional()@Inject(MAT_DIALOG_DATA)
    public data: {usuario: Usuario},
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.usuario = new Usuario();
    this.rangos = new Array<Rango>();
  }

  ngOnInit(): void {

    this.usuario = this.data.usuario
       
    this.rangosService.getRangos().subscribe(
      response => {
        this.rangos = response
        console.log(response)
      }
    )
  }


  editarRango(){
    this.rangosService.postRangoUsuario(this.usuario.id,this.selectedValue.id).subscribe(
      response =>{
        console.log(response)
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
