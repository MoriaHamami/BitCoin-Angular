import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
    constructor(
        private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute
    ) { }
    contact!: Contact
    subscription!: Subscription


    ngOnInit(): void {

        this.subscription = this.route.data.subscribe(({ contact }) => {
            this.contact = contact || this.contactService.getEmptyContact() as Contact
        })

        // this.subscription = this.route.params.subscribe(async ({ id }) => {
        //     this.contact = id ?
        //         await lastValueFrom(this.contactService.getById(id)) :
        //         this.contactService.getEmptyContact() as Contact
        // })

        // this.contact = this.contactService.getEmptyContact() as Contact
        // console.log('this.contact:', this.contact)
    }

    async onAddContact() {
        try {
            await lastValueFrom(this.contactService.saveContact(this.contact))
            this.router.navigateByUrl('/contact')
        } catch (err) {
            console.log('err:', err)
        }

    }

    onBack() {
        this.router.navigateByUrl('/contact')
    }
    
    onRemoveContact() {
        this.contactService.deleteContact(this.contact._id!)
        this.router.navigateByUrl('/contact')
        // this.remove.emit(this.contact._id)
    }

    // handleDateField(dateStr: string) {
    //     this.contact.birthDate = new Date(dateStr)
    // }
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

}
