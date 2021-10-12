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

  deletePortafolio(portafolio: Portafolio):Observable<any>{
    return this.http.delete(this.urlBase + '?id=' + portafolio.id)
  }

  postPortafolio(portafolio: Portafolio):Observable<any>{

    return this.http.post(this.urlBase,portafolio,{reportProgress: true,
      observe: 'events'});
  }
}
