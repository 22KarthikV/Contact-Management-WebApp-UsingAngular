import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2>{{ isEditMode ? 'Edit' : 'Add' }} Contact</h2>
      <form (ngSubmit)="onSubmit(contactForm)" #contactForm="ngForm">
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input type="text" class="form-control" id="firstName" name="firstName" 
                 [(ngModel)]="contact.firstName" required #firstName="ngModel">
          <div *ngIf="firstName.invalid && (firstName.dirty || firstName.touched)" class="alert alert-danger">
            First Name is required.
          </div>
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="lastName" name="lastName" 
                 [(ngModel)]="contact.lastName" required #lastName="ngModel">
          <div *ngIf="lastName.invalid && (lastName.dirty || lastName.touched)" class="alert alert-danger">
            Last Name is required.
          </div>
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Gender</label>
          <select class="form-select" id="gender" name="gender" [(ngModel)]="contact.gender" required #gender="ngModel">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div *ngIf="gender.invalid && (gender.dirty || gender.touched)" class="alert alert-danger">
            Gender is required.
          </div>
        </div>
        <div class="mb-3">
          <label for="dateOfBirth" class="form-label">Date of Birth</label>
          <input type="date" class="form-control" id="dateOfBirth" name="dateOfBirth" 
                 [(ngModel)]="contact.dateOfBirth" required #dateOfBirth="ngModel">
          <div *ngIf="dateOfBirth.invalid && (dateOfBirth.dirty || dateOfBirth.touched)" class="alert alert-danger">
            Date of Birth is required.
          </div>
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input type="text" class="form-control" id="location" name="location" 
                 [(ngModel)]="contact.location" required #location="ngModel">
          <div *ngIf="location.invalid && (location.dirty || location.touched)" class="alert alert-danger">
            Location is required.
          </div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" name="email" 
                 [(ngModel)]="contact.email" required email #email="ngModel">
          <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">
            <div *ngIf="email.errors?.['required']">Email is required.</div>
            <div *ngIf="email.errors?.['email']">Email must be a valid email address.</div>
          </div>
        </div>
        <div class="mb-3">
          <label for="mobile" class="form-label">Mobile</label>
          <input type="tel" class="form-control" id="mobile" name="mobile" 
                 [(ngModel)]="contact.mobile" required pattern="[0-9]{10}" #mobile="ngModel">
          <div *ngIf="mobile.invalid && (mobile.dirty || mobile.touched)" class="alert alert-danger">
            <div *ngIf="mobile.errors?.['required']">Mobile number is required.</div>
            <div *ngIf="mobile.errors?.['pattern']">Mobile number must be 10 digits.</div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Groups</label>
          <div>
            <button type="button" *ngFor="let group of availableGroups" 
                    (click)="toggleGroup(group)"
                    class="btn btn-outline-primary me-2 mb-2"
                    [class.active]="contact.groups.includes(group)">
              {{ group }}
            </button>
          </div>
        </div>
        <button type="submit" class="btn btn-primary me-2" [disabled]="!contactForm.form.valid">
          {{ isEditMode ? 'Update' : 'Add' }} Contact
        </button>
        <button type="button" class="btn btn-secondary" (click)="clearForm()">Clear</button>
      </form>
    </div>
  `,
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: '',
    location: '',
    email: '',
    mobile: '',
    groups: []
  };
  isEditMode = false;
  availableGroups: string[] = ['Family', 'Friends', 'Work', 'Other'];

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      const existingContact = this.contactService.getContactById(Number(id));
      if (existingContact) {
        this.contact = { ...existingContact };
      }
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditMode) {
        this.contactService.updateContact(this.contact);
      } else {
        this.contactService.addContact(this.contact);
      }
      this.router.navigate(['/']);
    }
  }

  clearForm(): void {
    this.contact = {
      id: 0,
      firstName: '',
      lastName: '',
      gender: 'Male',
      dateOfBirth: '',
      location: '',
      email: '',
      mobile: '',
      groups: []
    };
  }

  toggleGroup(group: string): void {
    const index = this.contact.groups.indexOf(group);
    if (index > -1) {
      this.contact.groups.splice(index, 1);
    } else {
      this.contact.groups.push(group);
    }
  }
}