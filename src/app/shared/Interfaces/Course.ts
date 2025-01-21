import { EventLocation } from "./EventLocation";

export interface Course {
    id: string;
    name: string;
  dates: {
    begin: string;
    end: string;
  }[];
  individualDates: {
    date: string;
    duration: string;
  }[];
  instructor: string;
  eventLocationId: number;
  eventLocation: EventLocation;
}
