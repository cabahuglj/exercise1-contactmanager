import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = 'http://192.168.1.14:8080/contact_api';
  constructor(private httpClient: HttpClient) { }

  public getContacts(): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/contact/getAll');
  }

  public deleteAllContacts(): Observable<any> {
    return this.httpClient.delete( this.BASE_URL + '/contact/deleteAll/');
  }

  public deleteAllAddresses(contactId: string): Observable<any> {
    return this.httpClient.delete( this.BASE_URL + '/addresses/deleteAll/' + contactId);
  }

  public deleteAllCommunications(contactId: string): Observable<any> {
    return this.httpClient.delete( this.BASE_URL + '/communications/deleteAll/' + contactId);
  }
}
