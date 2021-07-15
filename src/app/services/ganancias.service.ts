import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';


// Encabezados HTTP
const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};
const cudOptionsHtml = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8'})
};



@Injectable({
  providedIn: 'root'
})
export class GananciasService {

  // URL Base
  private urlBase = environment.url;  

  constructor(
    private http: HttpClient
  ) { }

  // getUsuarios():Observable<any>{
  //   return this.http.get(this.urlBase + '/usuarios.php');
  // }

  getGananciaUsuario(id: any):Observable<any>{
    return this.http.get(this.urlBase + '/ganancias.php?id_usuario=' + id);
  }

  postGanancia(id: number,ganancia: number,f_cobro: Date):Observable<any>{
    const fd = new FormData();
    fd.append('id_usuario',id.toString());
    fd.append('ganancia',ganancia.toString());
    const fecha = f_cobro.toISOString();
    console.log(fecha)
    fd.append('fecha_cobro',fecha);
    return this.http.post(this.urlBase + '/ganancias.php',fd);
  }

  putGanancia(id: number,ganancia: number):Observable<any>{
    const fd = new FormData();
    fd.append('id',id.toString());
    fd.append('ganancia',ganancia.toString());
    return this.http.put(this.urlBase + '/ganancias.php',fd);
  }

  // verificarUsuario(usuario: Usuario):Observable<any>{
  //   return this.http.get(this.urlBase + '/verificarUsuario.php?username='+usuario.username);
  // }

  // stateUsuario(usuario: Usuario, estado: string):Observable<any>{
  //   return this.http.delete(this.urlBase + '/usuarios.php?id=' + usuario.id + '&estado=' + estado);
  // }

  // deleteUsuario(usuario: Usuario):Observable<any>{
  //   return this.http.delete(this.urlBase + '/usuarios.php?id=' + usuario.id);
  // }

}
