import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Portafolio } from '../models/portafolio';
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
export class PortafolioService {

  // URL Base
  private urlBase = environment.url + '/portafolios.php'

  private urlAP = environment.url + '/arbolPortafolio.php'

  // Variable de URL API
  private apiPostLogin = this.urlBase;

  constructor(
    public http: HttpClient
  ) { }

  getPortafolios():Observable<any>{
    return this.http.get(this.urlBase);
  }

  getPortafolio(id:number):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + id);
  }

  getPortafoliosUsuario(id: number):Observable<any>{
    return this.http.get(this.urlAP + '?id=' + id);
  }
  
  putArbolPortafolios(usuario: Usuario):Observable<any>{
    return this.http.put(this.urlAP, usuario);
  }

  getPortafoliosArbol(usuario: Usuario):Observable<any>{
    return this.http.get(this.urlAP + '?usuario=' + usuario.id);
  }

  updatePortafolio(portafolio: Portafolio):Observable<any>{
    return this.http.put(this.urlBase,portafolio)
  }

  postPortafolio(portafolio: Portafolio):Observable<any>{
    const fd = new FormData()
    fd.append('tipo',portafolio.tipo)
    fd.append('precio',portafolio.precio.toString())
    fd.append('puntos',portafolio.puntos.toString())
    fd.append('porcentaje',portafolio.porcentaje.toString())

    return this.http.post(this.urlBase,fd)
  }
}
