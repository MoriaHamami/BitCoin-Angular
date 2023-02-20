import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'contact-index',
    templateUrl: './contact-index.component.html',
    // styleUrls: ['./contact-index.component.scss']
})
export class ContactIndexComponent implements OnInit, OnDestroy {

    constructor(private contactService: ContactService) { }

    contacts$!: Observable<Contact[]>
    subscription!: Subscription
    selectedContactId: string = ''
    prm = Promise.resolve('Resolved!')
    filterBy = {term: ''}

    ngOnInit(): void {

        this.contactService.loadContacts(this.filterBy)
        this.contacts$ = this.contactService.contacts$
        // console.log('this.contacts$:', this.contacts$)
        // this.subscription = this.contactService.contacts$.subscribe(contacts => {
        //     this.contacts = contacts
        // })


    }

    // onSelectContactId(contactId: string) {
    //     console.log('contactId:', contactId)
    //     this.selectedContactId = contactId
    // }

    onRemoveContact(contactId: string) {
        this.contactService.deleteContact(contactId)
    }

    ngOnDestroy(): void {
        // this.subscription?.unsubscribe()
    }

}
