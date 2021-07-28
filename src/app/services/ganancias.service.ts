import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ganancia } from '../models/ganancia';
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

  postGanancia(id: number,ganancia: Ganancia):Observable<any>{
    const fd = new FormData();
    fd.append('id_usuario',id.toString());
    fd.append('total',ganancia.total.toString());
    fd.append('venta_directa',ganancia.venta_directa.toString());
    fd.append('primera_linea',ganancia.primera_linea.toString());
    fd.append('segunda_linea',ganancia.segunda_linea.toString());
    fd.append('tercera_linea',ganancia.tercera_linea.toString());
    fd.append('cuarta_linea',ganancia.cuarta_linea.toString());
    fd.append('puntos_izquierda',ganancia.puntos_izquierda.toString());
    fd.append('puntos_derecha',ganancia.puntos_derecha.toString());
    fd.append('binario',ganancia.binario.toString());
    fd.append('semanal',ganancia.semanal.toString());
    const fecha = ganancia.fecha_cobro.toISOString();
    fd.append('fecha_cobro',fecha);

    console.log(id)
    console.log(ganancia)
    console.log(ganancia.fecha_cobro.toISOString())
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
