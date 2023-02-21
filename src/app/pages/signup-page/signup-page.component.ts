import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  userName!: string

  async onSignIn() {
    try {
      await this.userService.signup(this.userName);
      this.router.navigateByUrl('/')
    } catch (err) {
      console.log('err:', err)
    }
  }
}
