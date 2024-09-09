import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUsername = 'isa@gmail.com';
  private validPassword = '1630';

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username === this.validUsername && password === this.validPassword) {
      return of(true);
    } else {
      return of(false);
    }
  }
}
