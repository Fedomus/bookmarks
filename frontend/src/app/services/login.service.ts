import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.isTokenExpired(this.token)) {
      this.token = "";
    }
  }

  private token: string = "";

  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  signup(signupForm: any) {

   return this.http.post<any>(
      environment.API_URL + "/auth/signup", 
      signupForm,
      {
        headers: {
          "Content-Type" : 'application/json'
        }
      }
    )
    .pipe(
      catchError(this.errorHandler)
    )
  }

  signin(signinForm: any) {

    return this.http.post<any>(
      environment.API_URL + "/auth/signin", 
      signinForm,
      { observe: 'response' }
    ).pipe(
      map((token: any) => {
        this.router.navigate(['/'])
        this.setToken(token.body.access_token)
        this.cookies.set("token", this.token)
        return token
      }),
      catchError(this.errorHandler)
    )
  }

  signout(): void {
    this.setToken('');
    this.cookies.set("token", this.token);
  }
  
  getToken(): string{
    return this.cookies.get("token")
  }

  setToken(token: string): void{
    this.token = token
  }

  checkAuth(): boolean{
    const token = this.getToken();
    if(token.length) return true
    else return false
  }

  getMe() {
    return this.http.get(environment.API_URL + '/usuarios/me')
  }

  editMe(formBody: Usuario): Observable<Object> {
    return this.http.patch(environment.API_URL + '/usuarios', formBody, {
      headers: {
        "Content-Type" : 'application/json'
      }
    })
  }

  deleteMe() {
    return this.http.delete(environment.API_URL + '/usuarios')
  }

  private errorHandler(error: HttpErrorResponse){
    if (error.status === 0) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocurrió un error: ' + error.error);

    } else {
      
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      
      return error.error.message;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Ocurrió un error.'));
  }
  
}
