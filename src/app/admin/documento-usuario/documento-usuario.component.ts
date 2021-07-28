import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-documento-usuario',
  templateUrl: './documento-usuario.component.html',
  styleUrls: ['./documento-usuario.component.css']
})
export class DocumentoUsuarioComponent implements OnInit {

  public usuario: Usuario;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {usuario: Usuario},
  ) {
    this.usuario = this.data.usuario;
  }

  ngOnInit(): void {
    console.log(this.usuario)
  }

}
