// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { RouterModule } from '@angular/router';
// // import { trigger, transition, style, animate } from '@angular/animations';
// // import { ContactService } from '../../services/contact.service';
// // import { Contact } from '../../models/contact.model';

// // @Component({
// //   selector: 'app-contact-list',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule],
// //   templateUrl: './contact-list.component.html',
// //   styleUrls: ['./contact-list.component.css'],
// //   animations: [
// //     trigger('fadeIn', [
// //       transition(':enter', [
// //         style({ opacity: 0 }),
// //         animate('300ms', style({ opacity: 1 })),
// //       ]),
// //     ]),
// //     trigger('slideInOut', [
// //       transition(':enter', [
// //         style({ transform: 'translateX(-100%)' }),
// //         animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
// //       ]),
// //       transition(':leave', [
// //         animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
// //       ])
// //     ])
// //   ]
// // })
// // export class ContactListComponent implements OnInit {
// //   contacts: Contact[] = [];

// //   constructor(private contactService: ContactService) {}

// //   ngOnInit(): void {
// //     this.loadContacts();
// //   }

// //   loadContacts(): void {
// //     this.contactService.getContacts().subscribe({
// //       next: (contacts) => {
// //         this.contacts = contacts;
// //       },
// //       error: (error) => {
// //         console.error('Error loading contacts:', error);
// //       }
// //     });
// //   }

// //   deleteContact(id: number): void {
// //     if (confirm('Are you sure you want to delete this contact?')) {
// //       this.contactService.deleteContact(id);
// //       this.loadContacts();
// //     }
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import { trigger, transition, style, animate } from '@angular/animations';
// import { ContactService } from '../../services/contact.service';
// import { Contact } from '../../models/contact.model';

// type SortableField = 'firstName' | 'lastName' | 'email' | 'dateOfBirth';
// @Component({
//   selector: 'app-contact-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, NgbPaginationModule],
//   template: `
//     <div class="container mt-4" @fadeIn>
//       <h2>Contact List</h2>
//       <a routerLink="/add" class="btn btn-primary mb-3">Add New Contact</a>
      
//       <div class="row mb-3">
//         <div class="col-md-4">
//           <input [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()" 
//                  class="form-control" placeholder="Search contacts...">
//         </div>
//         <div class="col-md-4">
//           <select [(ngModel)]="filterCriteria" (ngModelChange)="applyFilters()" class="form-select">
//             <option value="">All Contacts</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <div class="col-md-4">
//         <select (change)="sort($event)" class="form-select">
//           <option value="">Sort by...</option>
//           <option *ngFor="let field of sortableFields" [value]="field">
//           {{ field | titlecase }}
//          </option>
//         </select>
//         </div>
//         </div>

//       <div class="list-group">
//         <div *ngFor="let contact of pagedContacts" class="list-group-item list-group-item-action" @slideInOut>
//           <div class="d-flex w-100 justify-content-between">
//             <h5 class="mb-1">{{ contact.firstName }} {{ contact.lastName }}</h5>
//             <small>{{ contact.email }}</small>
//           </div>
//           <p class="mb-1">{{ contact.mobile }}</p>
//           <div class="mt-2">
//             <a [routerLink]="['/details', contact.id]" class="btn btn-sm btn-info me-2">Details</a>
//             <a [routerLink]="['/edit', contact.id]" class="btn btn-sm btn-warning me-2">Edit</a>
//             <button (click)="deleteContact(contact.id)" class="btn btn-sm btn-danger">Delete</button>
//           </div>
//         </div>
//       </div>
//       <ng-template #noContacts>
//         <div class="alert alert-info" role="alert">
//           No contacts found matching your search criteria.
//         </div>
//       </ng-template>

//       <div class="d-flex justify-content-center mt-3">
//         <ngb-pagination
//           [(page)]="currentPage"
//           [pageSize]="pageSize"
//           [collectionSize]="filteredContacts.length"
//           (pageChange)="onPageChange($event)">
//         </ngb-pagination>
//       </div>
//     </div>
    
//   `,
//   styleUrls: ['./contact-list.component.css'],
//   animations: [
//     trigger('fadeIn', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('300ms', style({ opacity: 1 })),
//       ]),
//     ]),
//     trigger('slideInOut', [
//       transition(':enter', [
//         style({ transform: 'translateX(-100%)' }),
//         animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
//       ]),
//       transition(':leave', [
//         animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
//       ])
//     ])
//   ]
// })
// export class ContactListComponent implements OnInit {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   pagedContacts: Contact[] = [];
//   searchTerm: string = '';
//   filterCriteria: string = '';
//   currentPage = 1;
//   pageSize = 10;

//   constructor(private contactService: ContactService) {}

//   sortableFields: SortableField[] = ['firstName', 'lastName', 'email', 'dateOfBirth'];

//   ngOnInit(): void {
//     this.loadContacts();
//   }

//   loadContacts(): void {
//     this.contactService.getContacts().subscribe({
//       next: (contacts) => {
//         this.contacts = contacts;
//         this.applyFilters();
//       },
//       error: (error) => {
//         console.error('Error loading contacts:', error);
//         // You can add user-facing error messages here
//       }
//     });
//   }

//   applyFilters(): void {
//     const trimmedSearchTerm = this.searchTerm.trim().toLowerCase();
//     this.filteredContacts = this.contacts.filter(contact => 
//       (contact.firstName.toLowerCase().includes(trimmedSearchTerm) ||
//        contact.lastName.toLowerCase().includes(trimmedSearchTerm) ||
//        contact.email.toLowerCase().includes(trimmedSearchTerm)) &&
//       (this.filterCriteria ? contact.gender === this.filterCriteria : true)
//     );
//     this.currentPage = 1;
//     this.updatePagedContacts();
//   }

//   sort(event: Event): void {
//     const selectedOption = (event.target as HTMLSelectElement).value as SortableField;
//     if (this.sortableFields.includes(selectedOption)){
//       this.filteredContacts.sort((a, b) => {
//         const valueA = a[selectedOption];
//         const valueB = b[selectedOption];
  
//         if (typeof valueA === 'string' && typeof valueB === 'string') {
//           return valueA.localeCompare(valueB);
//         } else if (typeof valueA === 'number' && typeof valueB === 'number') {
//           return valueA - valueB;
//         } else {
//           // For other types or mixed types, convert to string and compare
//           return String(valueA).localeCompare(String(valueB));
//         }
//       });
//       this.updatePagedContacts();
//     }
//   }

//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.updatePagedContacts();
//   }

//   updatePagedContacts(): void {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     this.pagedContacts = this.filteredContacts.slice(startIndex, startIndex + this.pageSize);
//   }

//   deleteContact(id: number): void {
//     if (confirm('Are you sure you want to delete this contact?')) {
//       this.contactService.deleteContact(id);
//       this.loadContacts(); // Reload the list after deletion
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgbPaginationModule],
  template: `
    <div class="container mt-4" @fadeIn>
      <h2>Contact List</h2>
      <a routerLink="/add" class="btn btn-primary mb-3">Add New Contact</a>
      
      <div class="row mb-3">
        <div class="col-md-4">
          <input [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()" 
                 class="form-control" placeholder="Search contacts...">
        </div>
        <div class="col-md-4">
          <select [(ngModel)]="filterCriteria" (ngModelChange)="applyFilters()" class="form-select">
            <option value="">All Contacts</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="col-md-4">
          <select (change)="sort($event)" class="form-select">
            <option value="">Sort by...</option>
            <option *ngFor="let field of sortableFields" [value]="field">
              {{ field | titlecase }}
            </option>
          </select>
        </div>
      </div>

      <ng-container *ngIf="filteredContacts.length > 0; else noContacts">
        <div class="list-group">
          <div *ngFor="let contact of pagedContacts" class="list-group-item list-group-item-action" @slideInOut>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ contact.firstName }} {{ contact.lastName }}</h5>
              <small>{{ contact.email }}</small>
            </div>
            <p class="mb-1">{{ contact.mobile }}</p>
            <div class="mt-2">
              <a [routerLink]="['/details', contact.id]" class="btn btn-sm btn-info me-2">Details</a>
              <a [routerLink]="['/edit', contact.id]" class="btn btn-sm btn-warning me-2">Edit</a>
              <button (click)="deleteContact(contact.id)" class="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
          <ngb-pagination
            [(page)]="currentPage"
            [pageSize]="pageSize"
            [collectionSize]="filteredContacts.length"
            (pageChange)="onPageChange($event)">
          </ngb-pagination>
        </div>
      </ng-container>

      <ng-template #noContacts>
        <div class="alert alert-info" role="alert">
          No contacts found matching your search criteria.
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./contact-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  pagedContacts: Contact[] = [];
  searchTerm: string = '';
  filterCriteria: string = '';
  currentPage = 1;
  pageSize = 10;
  sortableFields: (keyof Contact)[] = ['firstName', 'lastName', 'email', 'dateOfBirth'];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
        // You can add user-facing error messages here
      }
    });
  }

  applyFilters(): void {
    const trimmedSearchTerm = this.searchTerm.trim().toLowerCase();
    this.filteredContacts = this.contacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return (
        fullName.includes(trimmedSearchTerm) ||
        contact.firstName.toLowerCase().includes(trimmedSearchTerm) ||
        contact.lastName.toLowerCase().includes(trimmedSearchTerm) ||
        contact.email.toLowerCase().includes(trimmedSearchTerm) ||
        contact.mobile.includes(trimmedSearchTerm)
      ) && (this.filterCriteria ? contact.gender === this.filterCriteria : true);
    });
    this.currentPage = 1;
    this.updatePagedContacts();
  }

  sort(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement).value as keyof Contact;
    if (this.sortableFields.includes(selectedOption)) {
      this.filteredContacts.sort((a, b) => {
        const valueA = a[selectedOption];
        const valueB = b[selectedOption];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        } else {
          return String(valueA).localeCompare(String(valueB));
        }
      });
      this.updatePagedContacts();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedContacts();
  }

  updatePagedContacts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedContacts = this.filteredContacts.slice(startIndex, startIndex + this.pageSize);
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
      this.loadContacts(); // Reload the list after deletion
    }
  }
}