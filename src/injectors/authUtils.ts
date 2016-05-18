import { Injectable } from '@angular/core';


@Injectable()
export class AuthUtils {

  private tokenParts;
  private jwtInfo;
  private userInfo;
  private loggedIn = false;

  constructor(){
    let token = localStorage.getItem('auth');
    if( !token ) {
      return;
    }
    this.loggedIn = true;
    this.tokenParts = token.split('.');
    this.jwtInfo = JSON.parse( atob(this.tokenParts[0]) );
    this.userInfo = JSON.parse( atob(this.tokenParts[1]) );
  }

  getUserInfo() {
    if( this.loggedIn ) {
      return this.userInfo;
    }else{
      return undefined;
    }
  }

  isAuthenticated() {
    return this.loggedIn;
  }
}
