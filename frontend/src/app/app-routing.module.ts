import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { LoginGuard } from './guards/login.guard';
import { SignupComponent } from './components/signup/signup.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {path: "", component: BookmarksComponent, canActivate: [LoginGuard]},
  {path:"perfil", component: PerfilComponent, canActivate: [LoginGuard]},
  {path:"signin", component: LoginComponent},
  {path:"signup", component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
