import { Component, OnInit } from '@angular/core';
import { faAddressBook, faBriefcase, faCoffee, faIdCard, faKey, faProjectDiagram, faSignOutAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';

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
  faProjectDiagram = faProjectDiagram;
  faBriefCase = faBriefcase;
  faCoffe = faCoffee;
  faAddressBook = faAddressBook;
  faUsers = faUsers;
  faSigOut = faSignOutAlt;

 
  public usuario: Usuario;
  
  constructor(
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
}
