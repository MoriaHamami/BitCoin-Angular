import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';

@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

    constructor(
        private contactService: ContactService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    @Input() contactId!: string
    contact!: Contact
    subscription!: Subscription

    async ngOnInit() {

        this.subscription = this.route.data.subscribe(data => {
            this.contact = data['contact']
        })
        // const contact = await lastValueFrom(this.contactService.getContactById(this.contactId))
        // this.contact = contact
    }

    onBack() {
        this.router.navigateByUrl('/contact')
    }

    onEditContact(ev: MouseEvent) {
        ev.stopPropagation()
        this.router.navigate(['contact/edit', this.contact._id])
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

}
