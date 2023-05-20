import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { Bookmark } from 'src/app/interfaces/bookmark';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  display$: Observable<'open' | 'close'>;

  content$: Observable<string>

  bookmark$: Observable<Bookmark>;

  usuario$: Observable<string>;

  constructor(
      private modalService: ModalService
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.content$ = this.modalService.getContent();
    this.bookmark$ = this.modalService.getBookmark();
    this.usuario$ = this.modalService.getUsuario();
  }

  close() {
    this.modalService.close();
  }
}
