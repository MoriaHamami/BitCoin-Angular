import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';
import { ContactService } from './contact.service';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  STORAGE_KEY_USER = 'loggedinUser'

  constructor(
    private contactService: ContactService,
    private storageService: StorageService,
    private utilService: UtilService,
  ) { }

  async signup(userName: string){
  // async saveUser(userName: string) {
    try {
      const prevUser = await this.storageService.load(this.STORAGE_KEY_USER)
      if (!prevUser || prevUser.name !== userName) {
        const newUser: User = {
          _id: this.utilService.makeId(),
          name: userName,
          coins: 100,
          moves: []
        }
        const savedUser = this.storageService.save(this.STORAGE_KEY_USER, newUser)
        return savedUser
      } else {
        return prevUser
      }
    } catch (err) {
      console.log('err:', err)
    }
  }

  getUser() {
      const currUser = this.storageService.load(this.STORAGE_KEY_USER)
      return currUser
  }
  // async getUser() {
  //   try {
  //     const currUser = await this.storageService.load(this.STORAGE_KEY_USER)
  //     return currUser
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  async addMove(contact: Contact, amount: number) {
  // async transferFunds(contact: Contact, amount: number) {
    try {
      if (amount === 0) return 'Please enter an amount'
      const currUser = this.getUser()
      // const currUser = await this.getUser()
      if (currUser.coins - amount <= 0) return 'Balance too low'
      const transaction = {
        id: this.utilService.makeId(),
        toId: contact._id,
        to: contact.name,
        fromId: currUser._id,
        from: currUser.name,
        at: Date.now(),
        amount
      }

      currUser.moves.unshift(transaction)
      currUser.coins -= amount
      this.storageService.save(this.STORAGE_KEY_USER, currUser)

      contact.transactions.unshift(transaction as Transaction)
      await this.contactService.saveContact(contact)

      return 'Transfer complete'
    } catch (err) {
      console.log('err:', err)
      throw new Error('Transfer failed')
    }
  }

  async getTransactions() {
    try {
      const currUser = await this.storageService.load(this.STORAGE_KEY_USER)
      return currUser.transactions
    } catch (err) {
      console.log('err:', err)
    }
  }

  updateUser(user: User) {
    try {
      this.storageService.save(this.STORAGE_KEY_USER, user)
      return user
    } catch (err) {
      console.log('err:', err)
      return 
    }
  }

}
