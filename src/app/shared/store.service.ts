import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  public courses: Course[] = [];
  public registrations: Registration[] = [];
  public registrationTotalCount: number = 0;
  public currentPage: number = 1;
  public coursesLoading = true;
  public registrationLoading = true;

  public loadingRegistrations: { [key: number]: boolean } = {};

  setLoading(registrationId: number, isLoading: boolean): void {
    if (isLoading) {
      this.loadingRegistrations[registrationId] = true;
    } else {
      delete this.loadingRegistrations[registrationId];
    }
  }
}
