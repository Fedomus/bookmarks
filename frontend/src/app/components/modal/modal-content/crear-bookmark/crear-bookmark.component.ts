import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookmarksService } from 'src/app/services/bookmarks.service';

@Component({
  selector: 'app-crear-bookmark',
  templateUrl: './crear-bookmark.component.html',
  styleUrls: ['./crear-bookmark.component.css']
})
export class CrearBookmarkComponent {

  constructor(private bookmarksService: BookmarksService){}

  createBookmarkForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
    link: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [Validators.maxLength(80)])
  });

  createBookmark(){

    let link = this.createBookmarkForm.value.link

    link = (link.split('://')[0] == 'https') || (link.split('://')[0] == 'http') ? link : 'http://' + link;
    
    this.createBookmarkForm.value.link = link;

    this.bookmarksService.createBookmark(this.createBookmarkForm.value)
    .subscribe(() => {
      window.location.reload();
    })
  }

  checkLink(link: string) {
    return this.bookmarksService.checkLink(link)
  }
}
