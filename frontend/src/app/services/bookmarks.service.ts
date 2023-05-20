import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  constructor(
    private http: HttpClient, 
    private cookies: CookieService
  ) {}

  getBookmarks(): Observable<Object> {
    return this.http.get(
      environment.API_URL + "/bookmarks"
    )
  }

  getToken(): string{
    return this.cookies.get("token")
  }

  createBookmark(data: any): Observable<Object>{    
    return this.http.post(
      environment.API_URL + "/bookmarks", 
      data
    )
  }

  deleteBookmark(bookmarkId: number): Observable<Object>{
    return this.http.delete(
      environment.API_URL + '/bookmarks/' + bookmarkId
    )
  }

  editBookmark(formData: any, bookmarkId: number): Observable<Object>{
    return this.http.patch(
      environment.API_URL + '/bookmarks/' + bookmarkId,
      formData
    )
  }

  checkLink(link: string){
    return this.http.get(link)
    .pipe(
      map((response: any) => {
        if(response.status = 200){
          return true
        }
        return false
      }),
      catchError((err) => {
        return err
      })
    ).subscribe(
      (response: any)=>{
        if(response.status = 200){
          return true
        }
        return false
      }
    )
  }

}