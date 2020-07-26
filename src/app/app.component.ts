import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Contact } from './contact';
import { Identification } from './identification';
import { Address } from './address';
import { Communication } from './communication';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact;
  contactAddIcon = faUserPlus;
  contactBullet = faAddressCard;
  contactDelIcon = faTrashAlt;
  isAddingContact = false;

  constructor(private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.apiService.getContacts().subscribe(data => {
      this.contacts = parseContacts(data);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you wish to delete all Contacts?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteAllContacts().subscribe(data => {
          this.selectedContact = null;
          this.contacts = [];
          this.showSuccess('Contact Information deleted successfully.');
        }, error => {
          this.showError('Error encountered: ' + error.message);
        });
      }
    });
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    this.isAddingContact = false;
  }

  showAddContact(): void {
    this.selectedContact = null;
    this.isAddingContact = true;
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success!');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error!');
  }
}

function parseContacts(data: any): Contact[] {
  const contacts: Contact[] = [];
  let id: Identification;
  let addresses: Address[] = [];
  let address: Address;
  let communications: Communication[] = [];
  let communication: Communication;

  for (const i of Object.keys(data)) {
    id = new Identification();
    id.oId = data[i].Identification.id;
    id.firstName = data[i].Identification.FirstName;
    id.lastName = data[i].Identification.LastName;
    id.dateOfBirth = data[i].Identification.DOB;
    id.gender = data[i].Identification.Gender;
    id.title = data[i].Identification.Title;
    addresses = [];
    for (const j of Object.keys(data[i].Address)) {
      address = new Address();
      address.oId = data[i].Address[j].id;
      address.addrType = data[i].Address[j].type;
      address.number = data[i].Address[j].number;
      address.street = data[i].Address[j].street;
      address.unit = data[i].Address[j].Unit;
      address.city = data[i].Address[j].City;
      address.state = data[i].Address[j].State;
      address.zipCode = data[i].Address[j].zipcode;
      addresses.push(address);
    }
    communications = [];
    for (const j of Object.keys(data[i].Communication)) {
      communication = new Communication();
      communication.oId = data[i].Communication[j].id;
      communication.commType = data[i].Communication[j].type;
      communication.value = data[i].Communication[j].value;
      communication.preferred = data[i].Communication[j].preferred;
      communications.push(communication);
    }
    contacts.push(new Contact(id, addresses, communications));
  }
  return sortByName(contacts, false);
}

function sortByName(contacts: Contact[], isDescending: boolean): Contact[] {
  let sortedContacts: Contact[] = [];
  sortedContacts = contacts.sort((a, b) => {
    if (a.identification.lastName > b.identification.lastName) {
      return invertSortRet(1, isDescending);
    } else if (a.identification.lastName < b.identification.lastName) {
      return invertSortRet(-1, isDescending);
    } else if (a.identification.firstName > b.identification.firstName) {
      return invertSortRet(1, isDescending);
    } else if (a.identification.firstName < b.identification.firstName){
      return invertSortRet(-1, isDescending);
    }
    return 0;
  });
  return sortedContacts;
}

// used a function instead because logical bitwise operator is not yet supported in Typescript
function invertSortRet(input: number, inverter: boolean): number {
  if (inverter) {
    return input * (-1);
  } else {
    return input;
  }
}
