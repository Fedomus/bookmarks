import { Component, Input } from '@angular/core';
import { Bookmark } from 'src/app/interfaces/bookmark';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent {

  @Input()
  content!: string

  @Input()
  bookmark!: Bookmark

  @Input()
  usuario!: string

}
