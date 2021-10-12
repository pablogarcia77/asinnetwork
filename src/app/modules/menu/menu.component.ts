import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { TosComponent } from '../tos/tos.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openRegistro() {
    this.dialog.open(
      RegistroComponent,
      {
        width: '100%',
        data: {
          id: undefined
        }
      }
    );
  }

  openSIM(){
    this.dialog.open(
      TosComponent,
      {
        width: '100%'
      }
    )
  }

  openLogin() {
    this.dialog.open(
      LoginComponent,
      {
        width: '100%',
      }
    );
  }

  closeDialog(){
    this.dialog.closeAll();
  }
  
}
