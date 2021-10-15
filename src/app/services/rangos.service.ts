import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ganancia } from '../models/ganancia';
import { Rango } from '../models/rango';
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
export class RangosService {

  // URL Base
  private urlBase = environment.url + '/rangos.php';  

  constructor(
    private http: HttpClient
  ) { }

  // getUsuarios():Observable<any>{
  //   return this.http.get(this.urlBase + '/usuarios.php');
  // }

  getRangos():Observable<any>{
    return this.http.get(this.urlBase);
  }

  getRangoUsuario(usuario: number):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + usuario)
  }

  postRangoUsuario(usuario: number,rango: number):Observable<any>{
    const fd = new FormData();
    fd.append('id_usuario',usuario.toString());
    fd.append('id_rango',rango.toString());
    return this.http.post(this.urlBase,fd);
  }

  postRango(rango: Rango):Observable<any>{
    return this.http.post(this.urlBase,rango)
  }

  deleteRango(id: number):Observable<any>{
    return this.http.delete(this.urlBase + '?id=' + id)
  }


}
