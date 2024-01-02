import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-usuario-eliminar',
  templateUrl: './usuario-eliminar.component.html',
  styleUrls: ['./usuario-eliminar.component.css']
})
export class UsuarioEliminarComponent {

  constructor(
    private login: LoginService,
    private modal: ModalService
  ) {}

  eliminarUsuario(){
    this.login.deleteMe().subscribe(() => {
      this.modal.close()
      this.login.signout();
    })
  }

}
