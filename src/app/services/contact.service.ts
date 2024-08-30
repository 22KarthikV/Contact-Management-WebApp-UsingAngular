import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private contactsSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);

  constructor() {
    this.loadContacts();
  }

  private loadContacts(): void {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
      this.contactsSubject.next(this.contacts);
    }
  }

  private saveContacts(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
    this.contactsSubject.next(this.contacts);
  }

  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Omit<Contact, 'id'>): void {
    const newContact: Contact = {
      ...contact,
      id: this.generateId()
    };
    this.contacts.push(newContact);
    this.saveContacts();
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.saveContacts();
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.saveContacts();
  }

  private generateId(): number {
    return this.contacts.length > 0
      ? Math.max(...this.contacts.map(c => c.id)) + 1
      : 1;
  }
}