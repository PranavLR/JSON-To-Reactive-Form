import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JosnFormControllerComponent } from './josn-form-controller/josn-form-controller.component';
import { ColorDirective } from './shared/directives/color.directive';
import { BackgroundColorDirective } from './shared/directives/background-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    JosnFormControllerComponent,
    ColorDirective,
    BackgroundColorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
