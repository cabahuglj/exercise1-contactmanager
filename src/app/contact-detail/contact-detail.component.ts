import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';
import { Gender } from '../definitions';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: Contact;
  hideGender: Gender = Gender.OTHER;
  constructor() { }

  ngOnInit(): void {
  }

}
