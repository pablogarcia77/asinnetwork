import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Arbol } from 'src/app/models/arbol';
import { Usuario } from 'src/app/models/usuario';
import { ArbolService } from 'src/app/services/arbol.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { Nodex } from 'src/app/models/nodex';
import { Enlace } from 'src/app/models/enlace';
import { Subject } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { Porta } from 'src/app/models/porta';
import { PortafolioService } from 'src/app/services/portafolio.service';
import { GananciasService } from 'src/app/services/ganancias.service';
import { Ganancia } from 'src/app/models/ganancia';
import { RangosService } from 'src/app/services/rangos.service';
import { Rango } from 'src/app/models/rango';
import { PuntosService } from 'src/app/services/puntos.service';
import { Puntos } from 'src/app/models/puntos';

@Component({
  selector: 'app-mired',
  templateUrl: './mired.component.html',
  styleUrls: ['./mired.component.css']
})
export class MiredComponent implements OnInit {

  usuario: Usuario;

  arbol!: Arbol;
  user!: Usuario;
  arbolAux!: Arbol;
  arbolAux2!: Arbol;
  nivel1!: number;
  nivel2!: number;
  nivel3!: number;
  nivel4!: number;
  izquierda!: number;
  derecha!: number;
  puntosIzquierda: number = 0;
  puntosDerecha: number = 0;
  semanalIzquierda: number = 0;
  semanalDerecha: number = 0;

  binario!: Puntos;

  public patrocinador: Usuario;

  gananciaCalculada: number=0;

  rango!: Rango;

  nodos!: Node[];
  links!: Edge[];
  zoomToFit$: Subject<boolean> = new Subject();
  view!: [number,number];

  href = 'assets/images/portafolios/';

  layout: string | Layout = 'dagre';
  layoutSettings = {
    orientation: 'TB',
    nodePadding: 15
  };

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();

  public generado_p1!: any;
  public generado_p2!: any;
  public generado_p3!: any;
  public generado_p4!: any;

  public ganancias!: Ganancia;

  public time1!: number
  public time2!: number
  public time3!: number
  public time4!: number
  
  panelOpenState = false;


  constructor(
    private arbolService: ArbolService,
    private userService: UsuariosService,
    private gananciasService: GananciasService,
    private rangosService: RangosService,
    private puntosService: PuntosService,
    @Optional()@Inject(MAT_DIALOG_DATA)
    public data: {usuario: Usuario,posicion: string},
    public dialog: MatDialog
  ) {
    this.usuario = new Usuario();
    this.arbol = new Arbol();
    this.arbol.patrocinados = new Array<Arbol>();
    
    this.nodos = [];
    this.links = [];

    this.nivel1=0;
    this.nivel2=0;
    this.nivel3=0;
    this.nivel4=0;
    this.izquierda=0;
    this.derecha=0;
    
    this.view = [1050, 750];

    this.ganancias = new Ganancia();

    this.patrocinador = new Usuario();

    this.binario = new Puntos()
    this.binario.izquierda = 0
    this.binario.derecha = 0

  }

  ngOnInit(): void {

    // console.log(this.data)
    let usuario = new Usuario();
    usuario = JSON.parse(localStorage.getItem('currentUser') || '');
    // console.log (usuario)
    this.view = (usuario.tipo === "normal") ? [1050, 750] : [1400,750];
    
    if(this.data){
      this.usuario = this.data.usuario
      // console.log('usuario normalito')
    }else{
      // console.log('administrador')
      this.usuario = usuario
    }

    this.puntosService.getPuntosByUser(this.usuario).subscribe(
      response => {
        // console.log(response)
        this.binario = response
      }
    )

    // console.log(this.usuario)
    this.dibujar(this.usuario);
    // console.log(this.nodos);

    this.gananciasService.getGananciaUsuario(this.usuario.id).subscribe(
      response => {
        // console.log(response)
        this.ganancias = response[0]
        // console.log(this.ganancias)
      }
    )

    this.rangosService.getRangoUsuario(this.usuario.id).subscribe(
      response => {
        this.rango = response
        // console.log(this.rango)
      }
    )
  }

  calcularBinario(){
    if(!(this.semanalIzquierda == 0 || this.semanalDerecha == 0)){
      if(this.semanalIzquierda >= this.semanalDerecha){
        this.binario.historico_izquierda = (this.binario.historico_izquierda*1) + (this.semanalDerecha*1)
        this.semanalIzquierda = this.semanalIzquierda - this.semanalDerecha
        this.binario.izquierda = this.semanalIzquierda
        this.binario.historico_derecha = this.puntosDerecha
        console.log(this.binario)
        this.binario.derecha = 0
        this.semanalDerecha = 0
      }else{
        this.binario.historico_derecha = (this.binario.historico_derecha*1) + (this.semanalIzquierda*1)
        this.semanalDerecha = this.semanalDerecha - this.semanalIzquierda
        this.binario.derecha = this.semanalDerecha
        this.binario.historico_izquierda = this.puntosIzquierda
        this.binario.izquierda = 0
        this.semanalIzquierda = 0
      }
    }
    this.puntosService.postPuntosByUser(this.usuario,this.binario).subscribe(
      response => {
        console.log(response)
      }
    )
  }

  dibujar(usu) {
    this.zoomToFit$.next(true)
    // this.usuario = JSON.parse(localStorage.getItem('currentUser') || '');

    let nodex = new Nodex();
    nodex.id = usu.id.toString();
    nodex.label = usu.username;
    this.nodos.push(nodex);

    this.user = usu;

    this.arbolService.getMiArbol(this.user).subscribe(
      response => {
        console.log(response)
        this.userService.getUsuario(response[0].patrocinador).subscribe(
          response => {
            console.log(response)
            if(response[0].estado == 1){
              this.patrocinador = response[0]
            }else{
              this.userService.getPatrocinador(response[0].id).subscribe(
                response => {
                  this.patrocinador = response
                }
              )
            }
          }
        )
        this.arbol = response[0]
        let f1 = (response[0].fecha_p1) ? new Date(response[0].fecha_p1) : undefined
        let f2 = (response[0].fecha_p2) ? new Date(response[0].fecha_p2) : undefined
        let f3 = (response[0].fecha_p3) ? new Date(response[0].fecha_p3) : undefined
        let f4 = (response[0].fecha_p4) ? new Date(response[0].fecha_p4) : undefined
        let hoy = new Date()

        

        this.time1 = (f1 != undefined) ? Math.trunc((hoy.getTime() - f1.getTime())/(1000*3600*24*7)) : undefined
        this.time2 = (f2 != undefined) ? Math.trunc((hoy.getTime() - f2.getTime())/(1000*3600*24*7)) : undefined
        this.time3 = (f3 != undefined) ? Math.trunc((hoy.getTime() - f3.getTime())/(1000*3600*24*7)) : undefined
        this.time4 = (f4 != undefined) ? Math.trunc((hoy.getTime() - f4.getTime())/(1000*3600*24*7)) : undefined

        // console.log(this.time1)
        // console.log(this.time2)
        // console.log(this.time3)
        // console.log(this.time4)

        // this.weeks = Math.trunc(time/(1000 * 3600 * 24 * 7)) * response[0].puntos_p1;
        this.generado_p1 = (f1 != undefined) ? this.time1 * response[0].precio_p1*response[0].porcentaje_p1/100 : undefined
        this.generado_p2 = (f2 != undefined) ? this.time2 * response[0].precio_p2*response[0].porcentaje_p2/100 : undefined
        this.generado_p3 = (f3 != undefined) ? this.time3 * response[0].precio_p3*response[0].porcentaje_p3/100 : undefined
        this.generado_p4 = (f4 != undefined) ? this.time4 * response[0].precio_p4*response[0].porcentaje_p4/100 : undefined

        // console.log( Math.trunc(time1/(1000 * 3600 * 24 * 7)) * response[0].precio_p1)
        this.gananciaCalculada = this.generado_p1*1 + this.generado_p2*1 + this.generado_p3

        // console.log(this.arbol)
        
        nodex.portafolio = new Array<Porta>();
        // Seteo Portafolios de la raiz
        let width = 0;
        for(var y=1;y<=3;y++){
          if(response[0]["p" + y ]){
            let cad = new Porta();
            cad.image = this.href + response[0]["p" + y ] + '.png';
            cad.x = width;
            width = width + 20;
            nodex.portafolio.push(cad)
          }
        }


      }
    )

    this.arbolService.getArbol(this.user).subscribe(
      response => {
        console.log(response)
        for (let index = 0; index < response.length; index++) {
          // if(response[index].estado == 1){
            this.user = new Usuario();
            this.user.id = response[index].id;
            this.user.username = response[index];

            let nod = new Nodex();
            nod.id = response[index].id.toString();
            nod.eliminado = (response[index].bloqueado== 0) ? false : true;
            nod.label = response[index].username;
            nod.posicion = response[index].posicion;
            nod.portafolio = new Array<Porta>();

            // Seteo Portafolios
            let width = 0;
            for(var y=1;y<=3;y++){
              if(response[index]["p" + y ] && response[index]["bloqueado"] == 0){
                let cad = new Porta();
                cad.image = this.href + response[index]["p" + y ] + '.png';
                cad.x = width;
                width = width + 20;
                nod.portafolio.push(cad)
              }
            }
            // Sumo contadores de lados y puntos por lado
            if(response[index].posicion == 'Derecha'){
              this.derecha++;
              for(var y=1;y<=3;y++){
                if(response[index]["p" + y ] && response[index]["bloqueado"] == 0){
                  // this.portafolioService.getPortafolio(response[index]["p" + y ]).subscribe(
                  //   portafolio => {
                  //     this.puntosDerecha += Number(portafolio[0].puntos);
                  //   }
                  // )
                  this.puntosDerecha += Number(response[index]["puntos_p" + y ]);
                }
              }
            }else{
              this.izquierda++;
              for(var y=1;y<=3;y++){
                if(response[index]["p" + y ] && response[index]["bloqueado"] == 0){
                  // this.portafolioService.getPortafolio(response[index]["p" + y ]).subscribe(
                  //   portafolio => {
                  //     this.puntosIzquierda += Number(response[index]["puntos_p" + y ]);
                  //   }
                  // )
                  this.puntosIzquierda += Number(response[index]["puntos_p" + y ]);
                }
              }
            }

            let e1 = new Enlace();
            e1.source = response[index].patrocinador;
            e1.target = response[index].id;

            this.nodos.push(nod);
            this.links.push(e1);          
            this.arbolService.getArbol(this.user).subscribe(
              res => {
                for(let i = 0 ; i < res.length; i++){
                  // if(res[i].estado == 1){
                    this.user = new Usuario();
                    this.user.id = res[i].id;
                    this.user.username = res[i];

                    let n = new Nodex();
                    n.id = res[i].id.toString();
                    n.eliminado = (res[i].bloqueado==0) ? false : true;
                    n.label = res[i].username;
                    n.posicion = res[i].posicion;

                    n.portafolio = new Array<Porta>();
                    // Seteo portafolios
                    let width = 0;
                    for(var y=1;y<=3;y++){
                      if(res[i]["p" + y ] && res[i]["bloqueado"] == 0){
                        let cad = new Porta();
                        cad.image = this.href + res[i]["p" + y ] + '.png';
                        cad.x = width;
                        width = width + 20;
                        n.portafolio.push(cad)
                      }
                    }
                    this.nodos.push(n);
                    
                    // Sumo contadores de lados y puntos por lado
                    if(response[index].posicion == 'Derecha'){
                      this.derecha++;
                      for(var y=1;y<=3;y++){
                        if(res[i]["p" + y ] && res[i]["bloqueado"] == 0){
                          // this.portafolioService.getPortafolio(res[i]["p" + y ]).subscribe(
                          //   portafolio => {
                          //     this.puntosDerecha += Number(portafolio[0].puntos);
                          //   }
                          // )
                          this.puntosDerecha += Number(res[i]["puntos_p" + y ]);
                        }
                      }
                    }else{
                      this.izquierda++;
                      for(var y=1;y<=3;y++){
                        if(res[i]["p" + y ] && res[i]["bloqueado"] == 0){
                          // this.portafolioService.getPortafolio(res[i]["p" + y ]).subscribe(
                          //   portafolio => {
                          //     this.puntosIzquierda += Number(portafolio[0].puntos);
                          //   }
                          // )
                        this.puntosIzquierda += Number(res[i]["puntos_p" + y ]);
                        }
                      }
                    }
                    let e2 = new Enlace();
                    e2.source = res[i].patrocinador;
                    e2.target = res[i].id;
                    this.links.push(e2);

                    this.arbolService.getArbol(this.user).subscribe(
                      r => {
                        for (let j = 0; j < r.length; j++) {
                          // if(r[j].estado == 1){
                            this.user = new Usuario();
                            this.user.id = r[j].id;
                            this.user.username = r[j];

                            let nod = new Nodex();
                            nod.id = r[j].id.toString();
                            nod.eliminado = (r[j].bloqueado==0) ? false : true;
                            nod.label = r[j].username;
                            nod.posicion = r[j].posicion;

                            nod.portafolio = new Array<Porta>();
                            // Seteo Portafolios
                            let width = 0;
                            for(var y=1;y<=3;y++){
                              if(r[j]["p" + y ] && r[j]["bloqueado"] == 0){
                                let cad = new Porta();
                                cad.image = this.href + r[j]["p" + y ] + '.png';
                                cad.x = width;
                                width = width + 20;
                                nod.portafolio.push(cad)
                              }
                            }
                            
                            this.nodos.push(nod);
                            
                            // Sumo contadores de lados y puntos por lado
                            if(response[index].posicion == 'Derecha'){
                              this.derecha++;
                              for(var y=1;y<=3;y++){
                                if(r[j]["p" + y ] && r[j]["bloqueado"] == 0){
                                  // this.portafolioService.getPortafolio(r[j]["p" + y ]).subscribe(
                                  //   portafolio => {
                                  //     this.puntosDerecha += Number(portafolio[0].puntos);
                                  //   }
                                  // )
                                  this.puntosDerecha += Number(r[j]["puntos_p" + y ]);
                                }
                              }
                            }else{
                              this.izquierda++;
                              for(var y=1;y<=3;y++){
                                if(r[j]["p" + y ] && r[j]["bloqueado"] == 0){
                                  // this.portafolioService.getPortafolio(r[j]["p" + y ]).subscribe(
                                  //   portafolio => {
                                  //     this.puntosIzquierda += Number(portafolio[0].puntos);
                                  //   }
                                  // )
                                  this.puntosIzquierda += Number(r[j]["puntos_p" + y ]);
                                }
                              }
                            }
                            let e3 = new Enlace();
                            e3.source = r[j].patrocinador;
                            e3.target = r[j].id;
                            this.links.push(e3);
                            this.arbolService.getArbol(this.user).subscribe(
                              rs => {
                                for (let k = 0; k < rs.length; k++) {
                                  // if(rs[k].estado==1){
                                    this.user = new Usuario();
                                    this.user.id = rs[k].id;
                                    this.user.username = rs[k].username;

                                    let not = new Nodex();
                                    not.id = rs[k].id.toString();
                                    not.eliminado = (rs[k].bloqueado==0) ? false : true;
                                    not.label = rs[k].username;
                                    not.posicion = rs[k].posicion;

                                    not.portafolio = new Array<Porta>();
                                    // Seteo portafolios
                                    let width = 0;
                                    for(var y=1;y<=3;y++){
                                      if(rs[k]["p" + y ] && rs[k]["bloqueado"] == 0){
                                        let cad = new Porta();
                                        cad.image = this.href + rs[k]["p" + y ] + '.png';
                                        cad.x = width;
                                        width = width + 20;
                                        not.portafolio.push(cad)
                                      }
                                    }
                                    
                                    
                                    this.nodos.push(not);
                                    
                                    // Sumo contadores de lados y puntos por lado
                                    if(response[index].posicion == 'Derecha'){
                                      this.derecha++;
                                      for(var y=1;y<=3;y++){
                                        if(rs[k]["p" + y ] && rs[k]["bloqueado"] == 0){
                                          // this.portafolioService.getPortafolio(rs[k]["p" + y ]).subscribe(
                                          //   portafolio => {
                                          //     this.puntosDerecha += Number(portafolio[0].puntos);
                                          //   }
                                          // )
                                          this.puntosDerecha += Number(rs[k]["puntos_p" + y ]);
                                        }
                                      }
                                    }else{
                                      this.izquierda++;
                                      for(var y=1;y<=3;y++){
                                        if(rs[k]["p" + y ] && rs[k]["bloqueado"] == 0){
                                          // this.portafolioService.getPortafolio(rs[k]["p" + y ]).subscribe(
                                          //   portafolio => {
                                          //     this.puntosIzquierda += Number(portafolio[0].puntos);
                                          //   }
                                          // )
                                          this.puntosIzquierda += Number(rs[k]["puntos_p" + y ]);
                                        }
                                      }
                                    }
                                    let e4 = new Enlace();
                                    e4.source = rs[k].patrocinador;
                                    e4.target = rs[k].id;
                                    this.links.push(e4);
                                  // } cuarto if estado
                                }
                              }
                            )
                          // } tercer if estado
                        }
                      }
                    )
                  // } segundo if estado
                }
              }
            )
          // } primer if estado
        }
      }
    )  
    setTimeout(() => {
      this.update$.next(true);
      this.zoomToFit$.next(true)
      this.semanalDerecha = this.puntosDerecha - this.binario.historico_derecha
      this.semanalIzquierda = this.puntosIzquierda - this.binario.historico_izquierda
    }, 2000);
    // this.center$.next(true)
    
  }

  // nuevoHistorico(izquierda,derecha){
  //   if(this.semanalDerecha == 0){
  //     this.binario.historico_derecha = this.puntosDerecha
  //   }else{
  //     this.binario.historico_derecha = 
  //   }
  //   if(this.semanalIzquierda == 0){
  //     this.binario.historico_izquierda = this.puntosIzquierda
  //   }else{

  //   }
  // }

  verUsuario(id: any,posicion: any){
    this.userService.getUsuario(id).subscribe(
      response => {
        this.dialog.open(
          ModalUsuarioComponent,
          {
            width: '100%',
            data: {
              usuario: response[0],
              posicion: posicion
            }
          }
        )
        // console.log(response);
      }
    )
  }

  // editarGanancias(){
  //    this.dialog.open(
  //      EditarGananciasComponent,
  //      {
  //        width: '50%',
  //        height: '40%',
  //        data: {
  //          usuario: this.data.usuario
  //        }
  //      }
  //    )
  // }
}
