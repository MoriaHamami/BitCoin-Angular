import {Transaction} from "./transaction.model"

export class Contact {

    constructor(
        public _id: string = '',
        public name: string = '',
        public email: string = '',
        public phone: string = '',
        public transactions: Array<Transaction> = []) {
    }

    setId?(id: string = 'r101') {
        // Implement your own set Id
        this._id = id
    }
}

export interface ContactFilter {
    term: string
}
