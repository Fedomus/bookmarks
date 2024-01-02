import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bookmark } from '../interfaces/bookmark';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject('close');
  private content: BehaviorSubject<string> = new BehaviorSubject("");
  private bookmark: BehaviorSubject<any> = new BehaviorSubject('');
  private usuario: BehaviorSubject<string> = new BehaviorSubject("");

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  getContent(): Observable<string>{
    return this.content.asObservable();
  }

  getBookmark(): Observable<Bookmark> {
    return this.bookmark.asObservable();
  }

  open(content:string, contenido?: any) {
    this.display.next('open');
    this.content.next(content);
    if(contenido.bookmark){
      this.bookmark.next(contenido.bookmark)
    }
    if(contenido.usuario){
      this.usuario.next(contenido.usuario)
    }
  }

  close() {
    this.display.next('close');
  }

  getUsuario(): Observable<string> {
    return this.usuario.asObservable();
  }
}
