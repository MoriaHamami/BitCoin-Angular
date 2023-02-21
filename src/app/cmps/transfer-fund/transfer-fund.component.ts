import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent {

  @Input() contact!: Contact

  constructor(
    private userService: UserService,
  ) { }

  amount = 0

  // ngOnInit(){
  //   console.log('this.contact:', this.contact)
  // }

  async onTransferCoins() {
    try {
      this.userService.addMove(this.contact, this.amount);
    } catch (err) {
      console.log('err:', err)
    }
  }
}
