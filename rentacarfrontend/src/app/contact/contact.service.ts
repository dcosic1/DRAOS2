import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Contact } from '../models/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) { }

  logProblem(contact: Contact) {
    // Save contact to DB
  }
}
