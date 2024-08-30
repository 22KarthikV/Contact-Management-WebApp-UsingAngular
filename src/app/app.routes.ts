import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

export const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'add', component: ContactFormComponent },
  { path: 'edit/:id', component: ContactFormComponent },
  { path: 'details/:id', component: ContactDetailsComponent },
  { path: '**', redirectTo: '' }
];