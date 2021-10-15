import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaPortafolio } from 'src/app/models/listaPortafolio';
import { Portafolio } from 'src/app/models/portafolio';
import { Usuario } from 'src/app/models/usuario';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  public usuario: Usuario;
  public posicion: string;

  public portafolios: Array<ListaPortafolio>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {usuario: Usuario,posicion: string},
    private portafoliosService: PortafolioService,
  ) {
    this.usuario = new Usuario();
    this.usuario = this.data.usuario;
    this.posicion = this.data.posicion;
    this.portafolios = new Array<ListaPortafolio>();
  }

  ngOnInit(): void {
    this.portafoliosService.getPortafoliosUsuario(this.usuario.id).subscribe(
      response => {
        for(let y=1;y<=4;y++){
          if(response[0]["p"+y]){
            let portafolio = new Portafolio();
            this.portafoliosService.getPortafolio(response[0]["p"+y]).subscribe(
              r => {
                let fecha = new Date(response[0]["fecha_p" + y]);
                let lista = new ListaPortafolio();
                // let vencimiento = new Date();
                lista.semanas = response[0]["s" + y];
                // console.log(lista)
                // console.log(fecha)
                // console.log(fecha.getTime() + (604800000 * lista.semanas))
                // console.log(fecha.getTime())
                // Get date in miliseconds & sum weeks (25/50) in miliseconds
                let vencimiento = new Date(fecha.getTime() + (6048 * 100000 * lista.semanas));
                // console.log(vencimiento)
                lista.vencimiento = vencimiento;
                lista.fecha = fecha;
                portafolio = r[0];
                lista.portafolio = portafolio;
                this.portafolios.push(lista);
              }
            )
          }
        }
      }
    )
    // console.log(this.portafolios)
  }

}
