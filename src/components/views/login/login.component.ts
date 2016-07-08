import {Component, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import TitleTile from '../../title-tile/title-tile.component';
import {LoginService} from '../../../services/login.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'plone-view-login',
  directives: [
  ],
  providers: [LoginService],
  template: require('./login.component.html')
})
export class Login {
  username = '';
  password = '';
  failed = false;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe(res => {
      let data = res.json();
      if (data.success && data.token) {
        localStorage.setItem('auth', data.token);
        this.router.navigateByUrl('/');
      } else {
        localStorage.removeItem('auth');
        this.failed = true;
      }
    });
  }

}
