import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { AsociarComponent } from './modules/asociar/asociar.component';
import { HerramientasComponent } from './modules/herramientas/herramientas.component';
import { HomeComponent } from './modules/home/home.component';
import { MiredComponent } from './modules/mired/mired.component';
import { MisgananciasComponent } from './modules/misganancias/misganancias.component';
import { MisportafoliosComponent } from './modules/misportafolios/misportafolios.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { PanelComponent } from './modules/panel/panel.component';
import { PerfilComponent } from './modules/perfil/perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'panel', component: PanelComponent,
    children: [
      {path: '', component: PerfilComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'redes', component: MiredComponent},
      {path: 'portafolios', component: MisportafoliosComponent},
      {path: 'asociar', component: AsociarComponent},
      {path: 'ganancias', component: MisgananciasComponent},
      {path: 'ganancias', component: MisgananciasComponent},
      {path: 'herramientas', component: HerramientasComponent},
      {path: 'lista-de-usuarios', component: ListaUsuariosComponent},
      {path: '**', component: NotfoundComponent},
    ]
  },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

