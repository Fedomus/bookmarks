import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from 'node_modules/@angular/forms';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { LoginService } from './services/login.service';
import { BookmarksService } from './services/bookmarks.service';
import { SignupComponent } from './components/signup/signup.component';
import { ItemBookmarkComponent } from './components/bookmarks/item-bookmark/item-bookmark.component';
import { JwtInterceptorProvider } from './jwt.interceptor';
import { ModalComponent } from './components/modal/modal.component';
import { ModalContentComponent } from './components/modal/modal-content/modal-content.component';
import { CrearBookmarkComponent } from './components/modal/modal-content/crear-bookmark/crear-bookmark.component';
import { EditarBookmarkComponent } from './components/modal/modal-content/editar-bookmark/editar-bookmark.component';
import { UsuarioEliminarComponent } from './components/modal/modal-content/usuario-eliminar/usuario-eliminar.component';
import { ModalService } from './services/modal.service';
import { EventBusService } from './services/event-bus.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioCreadoComponent } from './components/modal/modal-content/usuario-creado/usuario-creado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookmarksComponent,
    SignupComponent,
    ItemBookmarkComponent,
    ModalComponent,
    ModalContentComponent,
    CrearBookmarkComponent,
    EditarBookmarkComponent,
    UsuarioEliminarComponent,
    PerfilComponent,
    UsuarioCreadoComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoginService, 
    BookmarksService,
    ModalService,
    JwtInterceptorProvider,
    EventBusService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
