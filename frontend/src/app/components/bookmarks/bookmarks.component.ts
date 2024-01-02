import { Component, OnInit } from '@angular/core';
import { BookmarksService } from '../../services/bookmarks.service';
import { Bookmark } from '../../interfaces/bookmark';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  
    constructor(
      private bookmarksService: BookmarksService,
      private modalService: ModalService
    ){}

    private bookmarks?: Bookmark[] = [];

    hayBookmarks: boolean = true; 
  
    ngOnInit(): void {

      this.bookmarksService.getBookmarks()
      .subscribe(
        (response: any)=> {

          if(response.length) {
            this.setBookmarks(response)
          } else {
            this.hayBookmarks = false;
          }
        }
      )

    } 

    abrirModal(){
      this.modalService.open("crear-bookmark");
    }
    
    getBookmarks(){
      return this.bookmarks
    }

    setBookmarks(data: Bookmark[]){
      this.bookmarks = data
    }    
}
