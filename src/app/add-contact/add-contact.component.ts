import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: Contact;
  profile = new FormGroup({
    firstName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
    lastName : new FormControl('', [Validators.minLength(2), Validators.maxLength(64)]),
    address: new FormGroup({
      street: new FormControl('', [Validators.minLength(2), Validators.maxLength(256)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)])
    }),
    communications: new FormGroup({
      type: new FormControl(''),
      cellNo: new FormControl(''),
      email: new FormControl('')
    })
  });

  @Input() isAddingContact: boolean;
  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

}
