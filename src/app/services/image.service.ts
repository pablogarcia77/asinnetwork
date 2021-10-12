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
export class ImageService {

  
  // URL Base
  private urlBase = environment.url + '/imagenes.php'

  // Variable de URL API
  private apiPostImage = this.urlBase;

  constructor(
    public http: HttpClient
  ) { }

  uploadImage(image: any):Observable<any>{
    const newSession = Object.assign({},image);
    return this.http.post<any[]>('https://asinnetwork.net/api/imagenes.php',newSession,{reportProgress: true,
    observe: 'events'});
  }
  
  
}
