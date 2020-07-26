import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { CommDetailComponent } from './comm-detail/comm-detail.component';
import { AlertModule } from './_alert';
import { RouterModule } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    AddressDetailComponent,
    CommDetailComponent,
    ConfirmationDialogComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
