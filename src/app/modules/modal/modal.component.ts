import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public idPatrocinador!: number;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {user : Usuario,idPatrocinador: number},
    public router: Router
  ) {
    this.idPatrocinador = data.idPatrocinador;
  }

  ngOnInit(): void {
    // console.log(this.idPatrocinador)
    if(this.idPatrocinador == undefined){
      localStorage.setItem('currentUser',JSON.stringify(this.data.user));
      
      setTimeout(()=>{
        this.dialog.closeAll();
        this.router.navigate(['panel']);
      }, 3000);
    }
  }
  
  cerrarModal(){
    this.dialog.closeAll();
  }

}
