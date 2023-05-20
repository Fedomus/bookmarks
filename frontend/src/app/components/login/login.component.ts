import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService
  ){}

  error: string = "";

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  
  signin(){
    this.loginService.signin(this.loginForm.value)
    .subscribe(
      (response: any) => {
        if(response[0] == 'C'){
          this.error = 'Contraseña inválida, intente nuevamente'
        }

        if(response[0] == 'U') {
          this.error = 'Usuario inválido, intente nuevamente'
        }
      }
    )
  }

}
