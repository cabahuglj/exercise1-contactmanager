import {Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { AddrType } from '../definitions';
import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  addAddrIcon = faMapMarkedAlt;
  delAddrIcon = faTrashAlt;
  typeHome: string = AddrType.HOME.toString();
  typeWork: string = AddrType.WORK.toString();

  fullName: string;

  @Input() contact: Contact;
  constructor(private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    this.fullName = this.contact.identification.lastName + ', ' + this.contact.identification.firstName;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you wish to delete all Addresses for ' + this.fullName + '?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteAllAddresses(this.contact.identification.oId).subscribe(data => {
          this.contact.addresses = [];
          this.showSuccess('Addresses deleted successfully.');
        }, error => {
          this.showError('Error encountered: ' + error.message);
        });
      }
    });
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success!');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error!');
  }
}
