import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";


@Injectable()
export class AuthUtils {

  private tokenParts;
  private jwtInfo;
  private userInfo;

  // false is the initial state
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    let token = localStorage.getItem('auth');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  getUserInfo() {
    let token = localStorage.getItem('auth');
    if(token) {
      this.tokenParts = token.split('.');
      try {
        this.jwtInfo = JSON.parse( atob(this.tokenParts[0]) );
        this.userInfo = JSON.parse( atob(this.tokenParts[1]) );
      } catch (e) {
        // XXX needs to be updated here...
        this.userInfo = {
          username: 'anonymous'
        };
      }
      return this.userInfo;
    } else {
      return undefined;
    }
  }
}
