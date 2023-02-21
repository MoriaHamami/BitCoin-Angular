import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(
    private bitcoinService: BitcoinService,
    private userService: UserService,
  ) { }

  rate!: string
  user!: User

  async ngOnInit() {
    const user = this.userService.getUser();
    this.user = user;
    const rate = await this.bitcoinService.getRate();
    this.rate = rate;
  }

}
