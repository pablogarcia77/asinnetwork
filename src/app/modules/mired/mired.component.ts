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
import { EditarGananciasComponent } from 'src/app/admin/editar-ganancias/editar-ganancias.component';
import { GananciasService } from 'src/app/services/ganancias.service';
import { Ganancia } from 'src/app/models/ganancia';

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

  public ganancias!: Ganancia;

  constructor(
    private arbolService: ArbolService,
    private userService: UsuariosService,
    private portafolioService: PortafolioService,
    private gananciasService: GananciasService,
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

    // console.log(this.usuario)
    this.dibujar(this.usuario);
    // console.log(this.nodos);

    this.gananciasService.getGananciaUsuario(this.usuario.id).subscribe(
      response => {
        console.log(response[0])
        this.ganancias = response[0]
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
        this.arbol = response[0]
        let f1 = new Date(response[0].fecha_p1)
        let f2 = new Date(response[0].fecha_p2)
        let f3 = new Date(response[0].fecha_p3)
        let hoy = new Date()

        // console.log(f1)
        // console.log(f2)

        let time1 = hoy.getTime() - f1.getTime()
        let time2 = hoy.getTime() - f2.getTime()
        let time3 = hoy.getTime() - f3.getTime()

        // this.weeks = Math.trunc(time/(1000 * 3600 * 24 * 7)) * response[0].puntos_p1;
        this.generado_p1 = Math.trunc(time1/(1000 * 3600 * 24 * 7)) * response[0].puntos_p1
        this.generado_p2 = Math.trunc(time2/(1000 * 3600 * 24 * 7)) * response[0].puntos_p2
        this.generado_p3 = Math.trunc(time3/(1000 * 3600 * 24 * 7)) * response[0].puntos_p3


        console.log(this.arbol)
        
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
        for (let index = 0; index < response.length; index++) {
          this.user = new Usuario();
          this.user.id = response[index].id;
          this.user.username = response[index];

          let nod = new Nodex();
          nod.id = response[index].id.toString();
          nod.label = response[index].username;
          nod.posicion = response[index].posicion;
          nod.portafolio = new Array<Porta>();

          // Seteo Portafolios
          let width = 0;
          for(var y=1;y<=3;y++){
            if(response[index]["p" + y ]){
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
              if(response[index]["p" + y ]){
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
              if(response[index]["p" + y ]){
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

                  this.user = new Usuario();
                  this.user.id = res[i].id;
                  this.user.username = res[i];

                  let n = new Nodex();
                  n.id = res[i].id.toString();
                  n.label = res[i].username;
                  n.posicion = res[i].posicion;

                  n.portafolio = new Array<Porta>();
                  // Seteo portafolios
                  let width = 0;
                  for(var y=1;y<=3;y++){
                    if(res[i]["p" + y ]){
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
                      if(res[i]["p" + y ]){
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
                      if(res[i]["p" + y ]){
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
                        this.user = new Usuario();
                        this.user.id = r[j].id;
                        this.user.username = r[j];

                        let nod = new Nodex();
                        nod.id = r[j].id.toString();
                        nod.label = r[j].username;
                        nod.posicion = r[j].posicion;

                        nod.portafolio = new Array<Porta>();
                        // Seteo Portafolios
                        let width = 0;
                        for(var y=1;y<=3;y++){
                          if(r[j]["p" + y ]){
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
                            if(r[j]["p" + y ]){
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
                            if(r[j]["p" + y ]){
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
                              this.user = new Usuario();
                              this.user.id = rs[k].id;
                              this.user.username = rs[k].username;

                              let not = new Nodex();
                              not.id = rs[k].id.toString();
                              not.label = rs[k].username;
                              not.posicion = rs[k].posicion;

                              not.portafolio = new Array<Porta>();
                              // Seteo portafolios
                              let width = 0;
                              for(var y=1;y<=3;y++){
                                if(rs[k]["p" + y ]){
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
                                  if(rs[k]["p" + y ]){
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
                                  if(rs[k]["p" + y ]){
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
                            }
                          }
                        )
                      }
                    }
                  )


                }
              }
          )
        }
      }
    )  
    setTimeout(() => {
      this.update$.next(true);
      this.zoomToFit$.next(true)
    }, 1000);
    // this.center$.next(true)
  }

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

  editarGanancias(){
     this.dialog.open(
       EditarGananciasComponent,
       {
         width: '60%',
         data: {
           usuario: this.data.usuario
         }
       }
     )
  }
}
