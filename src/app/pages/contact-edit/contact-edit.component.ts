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








// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { Contact } from 'src/app/models/contact.model';
// import { ContactService } from 'src/app/services/contact.service';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';



// @Component({
//     selector: 'contact-edit',
//     templateUrl: './contact-edit.component.html',
//     styleUrls: ['./contact-edit.component.scss']
// })
// export class ContactEditComponent implements OnInit, OnDestroy {

//     form !: FormGroup
//     contact: Contact | undefined
//     subscription!: Subscription
//     faTrash = faTrash
//     faCircleArrowLeft = faCircleArrowLeft

//     constructor(
//         private contactService: ContactService,
//         private route: ActivatedRoute,
//         private router: Router,
//         private fb: FormBuilder) {
//         this.form = this.fb.group({
//             name: ['', [Validators.required]],
//             email: '',
//             phone: ''
//         })
//     }

//     ngOnInit(): void {
//         this.subscription = this.route.data.subscribe(({ contact }) => {
//             if (contact) {
//                 this.contact = contact
//                 this.form.patchValue(contact)
//             }
//         })

//     }

//     onSubmit(): void {
//         try {
//             const contact = { ...this.contact, ...this.form.value }
//             this.contactService.saveContact(contact)
//             this.onBack()
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     onRemove() {
//         try {
//             if (this.contact?._id) this.contactService.deleteContact(this.contact?._id)
//             this.onBack()
//         } catch (err) {
//             console.error(err)
//         }
//     }

//     onBack(): void {
//         this.router.navigateByUrl('/contact')
//     }

//     ngOnDestroy(): void {
//         this.subscription.unsubscribe()
//     }
// }


