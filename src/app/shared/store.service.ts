import { Injectable } from '@angular/core';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class StoreService {

  constructor(private http: HttpClient) { }

  public courses: Course[] = [];
  public registrations: Registration[] = [];
  public registrationTotalCount: number = 0;
  public currentPage: number = 1;
  public coursesLoading = true;
  public registrationLoading = true;

}


