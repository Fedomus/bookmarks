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
    UsuarioCreadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
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
