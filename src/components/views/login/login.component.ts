import {Component, Renderer} from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {AuthUtils} from '../../../injectors/authUtils';
import {Location} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'plone-view-login',
  template: require('./login.component.html')
})
export class Login {
  username = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private authUtils: AuthUtils,
    private router: Router
  ) {}

  ngOnInit() {
    this.authUtils.isAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
      }
    });
  }

  onLogin() {
    this.loginService.login(this.username, this.password);
  }

}
