import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { ModalService } from './services/modal.service';
import { EventBusService } from './services/event-bus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Aplicación de Marcadores';

  eventBusSub?: Subscription;

  constructor(
    private login: LoginService,
    private modal: ModalService,
    private eventBusService: EventBusService
  ) {}
  
  signout(){
    this.login.signout()
    this.modal.close()
    window.location.reload()
  }

  ngOnInit(): void {
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.login.signout();
    });
  }

  estaLogueado(): boolean {
    return this.login.checkAuth()
  }

  abrirModal(accion: string){
    this.modal.open(accion)
  }
}
