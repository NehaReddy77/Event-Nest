import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Event } from "./event.model";
import { Date } from "mongoose";

@Injectable({ providedIn: "root" })
export class EventsService {
  private events: Event[] = [];
  private postsUpdated = new Subject<Event[]>();
  private eventLabel : String = "";
  private eventLabelUpdated = new Subject<String>();
  
  constructor(private http: HttpClient) {}

  /*predictEvent(eventTitle : string) {
    this.http.post<any>('http://localhost:3001/api/bert', { event_title: eventTitle })
      .pipe(labelData => {
        console.log("logging response")
        console.log(labelData)
        return labelData.predicted_label;
      })
      .subscribe((label:String)=>{
        this.eventLabel = label;
        this.eventLabelUpdated.next(this.eventLabel);
      });
  }
  getEventLabelUpdateListener() {
    return this.eventLabelUpdated.asObservable();
  }*/
  getEvents() {
    this.http
      .get<{ message: string; events: any }>(
        "http://localhost:3000/api/events"
      )
      .pipe(map((eventData) => {
        return eventData.events.map(event => {
          return {
            title: event.title,
            content: event.content,
            date: event.date,
            formatted_address: event.formatted_address,
            latitude: event.latitude,
            longitude: event.longitude,
            id: event._id
          };
        });
      }))
      .subscribe(transformedEvents => {
        this.events = transformedEvents;
        this.postsUpdated.next([...this.events]);
      });
  }

  getEventUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addEvent(title: string, content: string, date : Date, formatted_address: string, latitude: number, longitude) {
    const event: Event = { id: null, title: title, content: content, date : date,
      formatted_address : formatted_address, latitude : latitude, longitude : longitude};
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/events", event)
      .subscribe(responseData => {
        const id = responseData.postId;
        event.id = id;
        this.events.push(event);
        this.postsUpdated.next([...this.events]);
      });
  }

  deleteEvent(eventId: string) {
    this.http.delete("http://localhost:3000/api/events/" + eventId)
      .subscribe(() => {
        const updatedEvents = this.events.filter(event => event.id !== eventId);
        this.events = updatedEvents;
        this.postsUpdated.next([...this.events]);
      });
  }
}
