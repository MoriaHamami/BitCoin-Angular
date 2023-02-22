import {Transaction} from "./transaction.model"

export class Contact {

    public _id?: string = ''
    constructor(
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
