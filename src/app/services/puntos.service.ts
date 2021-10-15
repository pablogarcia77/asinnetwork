import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Puntos } from '../models/puntos';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {

  // URL Base
  private urlBase = environment.url + '/puntos.php';  

  constructor(
    private http: HttpClient
  ) { }


  getPuntosByUser(usuario: Usuario):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + usuario.id)
  }

  postPuntosByUser(usuario: Usuario, puntos: Puntos):Observable<any>{
    let fd = new FormData()
    fd.append("id_usuario",usuario.id.toString())
    fd.append("historico_derecha",puntos.historico_derecha.toString())
    fd.append("historico_izquierda",puntos.historico_izquierda.toString())
    return this.http.post(this.urlBase, fd)
  }

  
}
