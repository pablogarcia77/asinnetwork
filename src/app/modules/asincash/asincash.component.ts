import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { AsincashService } from 'src/app/services/asincash.service';

@Component({
  selector: 'app-asincash',
  templateUrl: './asincash.component.html',
  styleUrls: ['./asincash.component.css']
})
export class AsincashComponent implements OnInit {

  public usuario: Usuario

  displayedColumns: string[] = ['fecha','cash'];
  public dataSource : MatTableDataSource<Usuario>;

  constructor(
    private cashService: AsincashService
  ) {
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('currentUser') || '');
    this.cashService.getUserCash(this.usuario).subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
      }
    )
  }

}
