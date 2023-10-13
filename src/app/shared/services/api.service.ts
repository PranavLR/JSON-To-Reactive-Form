import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient)

  getJsonFormData() {
    return this.http.get('../../../assets/form.json');
    return this.http.get('https://mocki.io/v1/fa32b136-8bbb-41ab-93b6-158802b74ddf');
  }
}
