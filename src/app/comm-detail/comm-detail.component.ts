import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { CommType } from '../definitions';
import { ConfirmationDialogComponent } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comm-detail',
  templateUrl: './comm-detail.component.html',
  styleUrls: ['./comm-detail.component.css']
})
export class CommDetailComponent implements OnInit {
  addCommIcon = faPhoneAlt;
  delCommIcon = faTrashAlt;
  cellIcon = faMobileAlt;
  emailIcon = faAt;
  typeCell: string = CommType.MOBILE.toString();
  typeEmail: string = CommType.EMAIL.toString();

  fullName: string;

  @Input() contact: Contact;
  constructor(private apiService: ApiService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.fullName = this.contact.identification.lastName + ', ' + this.contact.identification.firstName;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you wish to delete all Contact Information for ' + this.fullName + '?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteAllCommunications(this.contact.identification.oId).subscribe(data => {
          this.contact.communications = [];
          this.showSuccess('Contact Information deleted successfully.');
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
