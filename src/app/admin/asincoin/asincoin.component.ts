import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { AsincashService } from 'src/app/services/asincash.service';

@Component({
  selector: 'app-asincoin',
  templateUrl: './asincoin.component.html',
  styleUrls: ['./asincoin.component.css']
})
export class AsincoinComponent implements OnInit {

  public usuario: Usuario

  displayedColumns: string[] = ['fecha','cash','acciones'];
  public dataSource : MatTableDataSource<Usuario>;

  public carga: boolean = false

  public cash: any

  public fecha: any

  public idCash: any

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild('eliminar', {static: false}) public popover: MatDialogRef<TemplateRef<any>>
  
  constructor(
    private cashService: AsincashService,
    @Inject(MAT_DIALOG_DATA)
    public data: {usuario: Usuario},
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.usuario = this.data.usuario
  }

  ngOnInit(): void {
    this.loadTable()
  }

  loadTable(){
    this.cashService.getUserCash(this.usuario).subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
  }

  deleteCash(template: TemplateRef<any>,cash: any){
    this.idCash = cash.id
    this.popover = this.dialog.open(template)
  }

  newCash(){
    this.carga = true
  }

  saveCash(){
    this.carga = false
    this.cashService.postUserCash(this.usuario,this.cash,this.fecha).subscribe(
      response => {
        console.log(response)
        this.loadTable()
      }
    )
  }

  closeDialog(){
    this.popover.close()
  }

  confirmDelete(){
    this.cashService.deleteCashUser(this.idCash).subscribe(
      response => {
        if(response){
          this.snackBar.open('Registro eliminado','Aceptar',{duration: 1500})
        }
      }
    )
    this.closeDialog()
    this.loadTable()
  }

}
