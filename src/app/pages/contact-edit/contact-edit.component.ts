import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

    form !: FormGroup
    contact: Contact | undefined
    subscription!: Subscription

    constructor(
        private contactService: ContactService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: '',
            phone: ''
        })
    }

    ngOnInit(): void {
        this.subscription = this.route.data.subscribe(({ contact }) => {
            if (contact) {
                this.contact = contact
                this.form.patchValue(contact)
            }
        })

    }

    onAddContact(): void {
        try {
            const contact = { ...this.contact, ...this.form.value }
            console.log('contact:', contact)
            this.contactService.saveContact(contact)
            this.onBack()
        } catch (err) {
            console.error(err)
        }
    }

    onRemoveContact() {
        try {
            if (this.contact?._id) this.contactService.deleteContact(this.contact?._id)
            this.onBack()
        } catch (err) {
            console.error(err)
        }
    }

    onBack(): void {
        this.router.navigateByUrl('/contact')
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

}





