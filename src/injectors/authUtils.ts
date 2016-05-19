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
    try{
      this.jwtInfo = JSON.parse( atob(this.tokenParts[0]) );
      this.userInfo = JSON.parse( atob(this.tokenParts[1]) );
    }catch(e){
      // XXX needs to be updated here...
      this.userInfo = {
        username: 'anonymous'
      };
    }
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
