import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  constructor(
    private loginService: LoginService,
    private modal: ModalService
  ) {}

  loadingData: boolean = true;

  ngOnInit(): void {
    this.loginService.getMe()
    .subscribe(
      (response) => {
        this.perfil = response
        this.loadingData = false;
      }
    );    
  }

  perfil: any

  perfilForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
  })

  editarUsuario(){
    this.loginService.editMe(this.perfilForm.value).subscribe()
    window.location.reload();
  }

  abrirModal(accion: string) {
    this.modal.open(accion);
  }

}
