import { Date } from "mongoose";

export interface Event {
  id: string;
  title: string;
  content: string;
  date: Date;
  formatted_address: String;
  latitude: Number;
  longitude: Number;
}
