import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  error: string = "";

  constructor(
    private loginService: LoginService, 
    private modal: ModalService
  ) {}

  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  signup() {
    this.loginService.signup(this.signupForm.value)
    .subscribe((response: any | number) => {
      if(response){

        if(response[0] == 'Y'){
          this.error="Ya existe un usuario registrado con ese nombre";
        }
        
        if(response.createdAt){
          this.modal.open('usuario-creado', {usuario: response.email})
        }
      }
    })
  }

}
