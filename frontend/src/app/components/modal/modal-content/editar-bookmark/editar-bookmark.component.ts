import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bookmark } from 'src/app/interfaces/bookmark';
import { BookmarksService } from 'src/app/services/bookmarks.service';

@Component({
  selector: 'app-editar-bookmark',
  templateUrl: './editar-bookmark.component.html',
  styleUrls: ['./editar-bookmark.component.css']
})
export class EditarBookmarkComponent implements OnInit{

  constructor(
    private bookmarksService: BookmarksService
  ){}

  ngOnInit(): void {
    this.editBookmarkForm = new FormGroup({
      nombre: new FormControl(this.bookmark.nombre, [Validators.required]),
      link: new FormControl(this.bookmark.link, [Validators.required, Validators.maxLength(40)]),
      descripcion: new FormControl(this.bookmark.descripcion, [Validators.maxLength(80)])
    });
  }

  editBookmarkForm : FormGroup

  @Input()
  bookmark!: Bookmark;

  editarBookmark(bookmarkId: number){
    this.bookmarksService.editBookmark(this.editBookmarkForm.value, bookmarkId)
    .subscribe(() => {
      window.location.reload()
    })
  }
}
