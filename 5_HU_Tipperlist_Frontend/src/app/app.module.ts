import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, BASE_PATH } from './swagger';
import { environment } from './environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.apiRoot}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
