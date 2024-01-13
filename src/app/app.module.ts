import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxGpAutocompleteModule } from "@angular-magic/ngx-gp-autocomplete";
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from "./app.component";
import { EventCreateComponent } from "./events/event-create/event-create.component";
import { HeaderComponent } from "./header/header.component";
import { EventListComponent } from "./events/event-list/event-list.component";
import { Loader } from "@googlemaps/js-api-loader";

@NgModule({
  declarations: [
    AppComponent,
    EventCreateComponent,
    HeaderComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxGpAutocompleteModule
  ],
  providers: [
    {
      provide: Loader,
      useValue: new Loader({
        apiKey: 'AIzaSyBr3E9pekC80X12Pzh9mTJjyh-hOZ2sQ0U',
        libraries: ['places']
      })
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
