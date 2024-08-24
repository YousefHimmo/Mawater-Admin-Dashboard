import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  fireBaseAuth = inject(Auth);
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  login(email: string, passwword: string): Observable<any> {
    return this.http.post(
      environment.LOGIN_URL,
      { email, passwword, returnSecureToken: true },
      { headers: this.headers }
    );
  }

  loginV2(email: string, passwword: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.fireBaseAuth,
      email,
      passwword
    ).then(()=>{})  
    return from(promise);
  }

  loggedIn() {
    if (localStorage.getItem('isLoggedIn') == '1') return true;
    else return false;
  }
}
