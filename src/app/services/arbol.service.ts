import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ArbolService {

  // URL Base
  private urlBase = environment.url + '/arbol.php'

  constructor(
    public http: HttpClient
  ) { }

  getArbol(usuario: Usuario):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + usuario.id);
  }

  getMiArbol(usuario: Usuario):Observable<any>{
    return this.http.get(this.urlBase + '?usuario=' + usuario.id);
  }

  postArbol(arbol: any):Observable<any>{
    const fd = new FormData();
    fd.append('patrocinador',arbol.patrocinador);
    fd.append('patrocinado',arbol.patrocinado);
    fd.append('posicion',arbol.posicion);
    // fd.append('p1',arbol.p1);
    // if(arbol.p2 != null){
    //   fd.append('p2',arbol.p2);
    // }
    // if(arbol.p3 != null){
    //   fd.append('p3',arbol.p3);
    // }
    return this.http.post(this.urlBase,fd);
  }

  putArbol(arbol: any):Observable<any>{
    return this.http.put(this.urlBase,arbol);
  }
  
}
