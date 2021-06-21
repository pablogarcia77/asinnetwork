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
export class LoginService {

  
  // URL Base
  private urlBase = environment.url + '/login.php'

  // Variable de URL API
  private apiPostLogin = this.urlBase;

  constructor(
    public http: HttpClient
  ) { }

  getUsuario(usuario: Usuario):Observable<any>{
    const fd = new FormData();
    fd.append('username',usuario.username);
    fd.append('password',usuario.password);
    return this.http.post(this.urlBase,fd);
  }

  
  
}
