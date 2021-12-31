import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faAddressBook, faBriefcase, faCoffee, faFileSignature, faIdCard, faKey, faMedal, faMoneyBillWave, faProjectDiagram, faSignOutAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';
import { TosComponent } from '../tos/tos.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  // Iconos
  faUser = faUser;
  faKey = faKey;
  faIdCard = faIdCard;
  faFileSignature = faFileSignature;
  faProjectDiagram = faProjectDiagram;
  faBriefCase = faBriefcase;
  faCoffe = faCoffee;
  faAddressBook = faAddressBook;
  faUsers = faUsers;
  faSigOut = faSignOutAlt;
  faMedal = faMedal;
  faMoneyBillWave = faMoneyBillWave

 
  public usuario: Usuario;
  
  constructor(
    private dialog: MatDialog
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    try{
      this.usuario = JSON.parse(localStorage.getItem('currentUser') || '{}');
      // console.log(this.usuario);

    }catch (e){
      console.log(e);
    }
    // this.usuario = JSON.parse(localStorage.getItem('currentUser'));
  }

  logOut(){
    localStorage.setItem('currentUser','');
  }

  openTOS(){
    this.dialog.open(
      TosComponent,{
        width: '100%'
      }
    )
  }
}
