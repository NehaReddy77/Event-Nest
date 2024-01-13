import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from "../events.service";
import { NgxGpAutocompleteDirective } from "@angular-magic/ngx-gp-autocomplete";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-event-create",
  templateUrl: "./event-create.component.html",
  styleUrls: ["./event-create.component.css"]
})
export class EventCreateComponent implements OnInit {
  myForm: FormGroup;
  enteredTitle = "";
  enteredContent = "";
  event_label = "";
  private eventsLabel: Subscription;
  @ViewChild('ngxPlaces') placesRef: NgxGpAutocompleteDirective;
  addressData = {formatted_address:"", latitude:0, longitude:0};
  public handleAddressChange(place: google.maps.places.PlaceResult) {
    // Do some stuff
    this.addressData = {
      formatted_address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };
    console.log(this.addressData)
  }
  constructor(public eventsService: EventsService, private fb: FormBuilder, private http: HttpClient) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      date: [null],
      title: [''],
      content: ['']
      //address: [null]
    });
  }
  
  onAddEvent() {
    if(this.myForm.valid){
    const formData = this.myForm.value;
    console.log(formData);
    this.eventsService.addEvent(formData.title, formData.content, formData.date, 
    this.addressData.formatted_address, this.addressData.latitude, this.addressData.longitude);
    this.getEventLabel(formData.title);
      
    }
    
    /*if (form.invalid) {
      return;
    }
    this.eventsService.addEvent(form.value.title, form.value.content, form.value.date);
    */
   //reset
    //this.myForm.resetForm();
  }
  getEventLabel(eventTitle : String) {
    if (eventTitle.trim() !== '') {
      this.http.post<any>('http://localhost:3001/api/bert', { event_title: eventTitle })
        .subscribe(response => {
          this.event_label = response.event_label;
        });
    }
  }
}
