import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { PortafolioService } from 'src/app/services/portafolio.service';

@Component({
  selector: 'app-misportafolios',
  templateUrl: './misportafolios.component.html',
  styleUrls: ['./misportafolios.component.css']
})
export class MisportafoliosComponent implements OnInit {

  public usuario!: Usuario;

  constructor(
    private misPortafolioService: PortafolioService,
  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}')[0];
    this.misPortafolioService.getPortafoliosUsuario(this.usuario.id).subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
