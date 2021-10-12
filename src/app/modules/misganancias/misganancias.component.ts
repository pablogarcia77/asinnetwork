import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { GananciasService } from 'src/app/services/ganancias.service';
import { TosComponent } from '../tos/tos.component';

@Component({
  selector: 'app-misganancias',
  templateUrl: './misganancias.component.html',
  styleUrls: ['./misganancias.component.css']
})
export class MisgananciasComponent implements OnInit {

  public usuario: Usuario
  public fecha_cobro: Date;
  public ganancia: number;

  constructor(
    private gananciasService: GananciasService,
  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '');

    this.gananciasService.getGananciaUsuario(this.usuario.id).subscribe(
      response => {
        // console.log(response[0])
        this.fecha_cobro = response[0].fecha_cobro
        this.ganancia = response[0].ganancia
      }
    )
  }
}
