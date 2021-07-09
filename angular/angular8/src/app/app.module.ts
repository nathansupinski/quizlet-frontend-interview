import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LearnModeComponent } from './learn-mode/learn-mode.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormValidators} from "./utils/form-validators";
import { FormItemComponent } from './form-item/form-item.component';
import {CheckAnswerService} from "./services/check-answer.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LearnModeComponent,
    FormItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
      FormValidators,
      CheckAnswerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
