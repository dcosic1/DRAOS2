import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8081/users';

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('http://localhost:8081/' + 'oauth/token', loginPayload, {headers});
  }
}
