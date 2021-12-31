import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AsincashService {

  // URL Base
  private urlBase = environment.url + '/cash.php'

  constructor(
    public http: HttpClient
  ) { }

  getUserCash(usuario: Usuario):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + usuario.id);
  }

  postUserCash(usuario: Usuario, cash: any, fecha: any):Observable<any>{
    let fd = new FormData()
    fd.append('id_usuario',usuario.id.toString())
    fd.append('cash', cash.toString())
    fd.append('fecha', fecha.toISOString())
    return this.http.post(this.urlBase, fd)
  }

  putUserCash(id: any,usuario: Usuario, cash: any):Observable<any>{
    let fd = new FormData()
    fd.append('id',id)
    fd.append('id_usuario',usuario.id.toString())
    fd.append('cash', cash.toString())
    return this.http.put(this.urlBase, fd)
  }

  deleteCashUser(id: any):Observable<any>{
    return this.http.delete(this.urlBase + '?id=' + id)
  }
}
