import { Component, inject } from '@angular/core';
import { delay, map } from 'rxjs';
import { ApiService } from './shared/services/api.service';
import { JsonFormInterface } from './shared/types/Json-form-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JSON To Reactive Form';
  
  private api = inject(ApiService)  
  
  formData$ = this.api.getJsonFormData().pipe(delay(3000), map((res: JsonFormInterface | any) => res.controls));
  
  console: Console = console



  isOnline: boolean = false;


  public ngOnInit(): void {
    this.updateOnlineStatus();

    window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }
}
