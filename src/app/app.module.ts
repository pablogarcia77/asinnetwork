import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './modules/menu/menu.component';
import { ModalComponent } from './modules/modal/modal.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { HomeComponent } from './modules/home/home.component';
import { FooterComponent } from './modules/footer/footer.component';
import { ContactoComponent } from './modules/contacto/contacto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PanelComponent } from './modules/panel/panel.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreditosComponent } from './modules/creditos/creditos.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuUserComponent } from './modules/menu-user/menu-user.component';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { MiredComponent } from './modules/mired/mired.component';
import { MisportafoliosComponent } from './modules/misportafolios/misportafolios.component';
import { MisgananciasComponent } from './modules/misganancias/misganancias.component';
import { HerramientasComponent } from './modules/herramientas/herramientas.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import {MatMenuModule} from '@angular/material/menu';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ModalUsuarioComponent } from './modules/modal-usuario/modal-usuario.component';
import { UnirmeComponent } from './modules/unirme/unirme.component';
import { AsociarComponent } from './modules/asociar/asociar.component';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { RedesComponent } from './admin/redes/redes.component';
import { GestionPortafoliosComponent } from './admin/gestion-portafolios/gestion-portafolios.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortafolioUsuarioComponent } from './admin/portafolio-usuario/portafolio-usuario.component';
import { EditarUsuarioComponent } from './admin/editar-usuario/editar-usuario.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EditarGananciasComponent } from './admin/editar-ganancias/editar-ganancias.component';
import { DocumentoUsuarioComponent } from './admin/documento-usuario/documento-usuario.component';
import { EditarRangosComponent } from './admin/editar-rangos/editar-rangos.component';
import { NuevoPortafolioComponent } from './admin/nuevo-portafolio/nuevo-portafolio.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TosComponent } from './modules/tos/tos.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { GestionRangosComponent } from './admin/gestion-rangos/gestion-rangos.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ModalComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    FooterComponent,
    ContactoComponent,
    PanelComponent,
    CreditosComponent,
    MenuUserComponent,
    PerfilComponent,
    MiredComponent,
    MisportafoliosComponent,
    MisgananciasComponent,
    HerramientasComponent,
    NotfoundComponent,
    ModalUsuarioComponent,
    UnirmeComponent,
    AsociarComponent,
    ListaUsuariosComponent,
    RedesComponent,
    GestionPortafoliosComponent,
    PortafolioUsuarioComponent,
    EditarUsuarioComponent,
    EditarGananciasComponent,
    DocumentoUsuarioComponent,
    EditarRangosComponent,
    NuevoPortafolioComponent,
    TosComponent,
    GestionRangosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatMenuModule,
    NgxGraphModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
