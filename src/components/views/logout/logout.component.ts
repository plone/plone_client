import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';


@Component({
  selector: 'plone-view-logout',
  template: '<div></div>'
})
export class Logout {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.onLogout();
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }

}
