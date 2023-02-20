import { Component } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(private bitcoinService: BitcoinService) { }

  rate!: string

  async ngOnInit() {
    const rate = await this.bitcoinService.getRate();
    this.rate = rate;
  }
}
