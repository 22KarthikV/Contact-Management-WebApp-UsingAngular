export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    location: string;
    email: string;
    mobile: string;
    groups: string[];
  }