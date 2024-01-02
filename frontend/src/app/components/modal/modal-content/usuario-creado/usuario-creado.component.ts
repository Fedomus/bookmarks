import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-creado',
  templateUrl: './usuario-creado.component.html',
  styleUrls: ['./usuario-creado.component.css']
})
export class UsuarioCreadoComponent {

  @Input()
  usuario!: any; 

}
