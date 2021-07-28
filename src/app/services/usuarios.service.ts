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
export class UsuariosService {

  // URL Base
  private urlBase = environment.url;

  // Variable de URL API
  private apiPostLogin = this.urlBase;
  

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios():Observable<any>{
    return this.http.get(this.urlBase + '/usuarios.php');
  }

  getUsuario(id: any):Observable<any>{
    return this.http.get(this.urlBase + '/usuarios.php?id=' + id);
  }

  postUsuario(usuario: Usuario):Observable<any>{
    const fd = new FormData();
    fd.append('username',usuario.username);
    fd.append('password',usuario.password);
    fd.append('apellido',usuario.apellido);
    fd.append('nombre',usuario.nombre);
    fd.append('documento',usuario.documento);
    fd.append('url_documento_frente',usuario.url_documento_frente);
    fd.append('url_documento_dorso',usuario.url_documento_dorso);
    fd.append('email',usuario.email);
    fd.append('telefono',usuario.telefono);
    fd.append('domicilio',usuario.domicilio);
    // fd.append('posicion',usuario.posicion);
    fd.append('banco',usuario.banco);
    fd.append('numero_cuenta',usuario.numero_cuenta);
    fd.append('registro',usuario.registro);
    return this.http.post(this.urlBase + '/usuarios.php',fd);
  }

  putUsuario(usuario: Usuario):Observable<any>{
    return this.http.put(this.urlBase + '/usuarios.php',usuario);
  }

  verificarUsuario(usuario: Usuario):Observable<any>{
    return this.http.get(this.urlBase + '/verificarUsuario.php?username='+usuario.username);
  }

  stateUsuario(usuario: Usuario, estado: string):Observable<any>{
    return this.http.delete(this.urlBase + '/usuarios.php?id=' + usuario.id + '&estado=' + estado);
  }

  deleteUsuario(usuario: Usuario):Observable<any>{
    return this.http.delete(this.urlBase + '/usuarios.php?id=' + usuario.id);
  }

}
