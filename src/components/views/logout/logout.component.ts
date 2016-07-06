import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'plone-view-logout',
  template: '<div></div>'
})
export class Logout {

  constructor(private router: Router) {
    this.onLogout();
  }

  onLogout() {
    // Since we're using JWT, the logout is done exclusively
    // on the client.
    localStorage.removeItem('auth');
    this.router.navigateByUrl('/');
  }

}
