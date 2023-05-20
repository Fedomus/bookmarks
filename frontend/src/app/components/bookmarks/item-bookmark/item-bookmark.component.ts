import { Component, Input } from '@angular/core';
import { Bookmark } from 'src/app/interfaces/bookmark';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-item-bookmark',
  templateUrl: './item-bookmark.component.html',
  styleUrls: ['./item-bookmark.component.css']
})
export class ItemBookmarkComponent {

  constructor(
    private modal : ModalService,
    private bookmarksService: BookmarksService
  ) {}

  @Input() bookmark!: Bookmark;

  abrirModal(accion: string){
    this.modal.open(accion, {bookmark: this.bookmark});
  }

  eliminarBookmark(){
    if(this.bookmark) {
      this.bookmarksService.deleteBookmark(this.bookmark.id)
      .subscribe(() => {
        window.location.reload();
      })
    }
  }

}
