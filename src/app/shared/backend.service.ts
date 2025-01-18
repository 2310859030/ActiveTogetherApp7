import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private storeService: StoreService) {}

  public getCourses() {
    this.http
      .get('http://localhost:5000/courses?_expand=eventLocation')
      .subscribe((data: any) => {
        this.storeService.courses = data;
        this.storeService.coursesLoading = false;
      });
  }

  public getRegistrations(page: number) {
    const options = {
      observe: 'response' as const,
      transferCache: {
        includeHeaders: ['X-Total-Count'],
      },
    };

    this.http
      .get(`http://localhost:5000/registrations?_expand=course&_page=${page}&_limit=2`, options)
      .subscribe((data: any) => {
        this.storeService.registrations = data.body!;
        this.storeService.registrationTotalCount = Number(
          data.headers.get('X-Total-Count')
        );
        this.storeService.registrationLoading = false;
      });
  }

  public addRegistration(registration: any, page: number) {
    const registrationWithDate = {
      ...registration,
      registrationDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), // Automatisches Datum
    };

    this.http
      .post('http://localhost:5000/registrations', registrationWithDate)
      .subscribe(() => {
        this.getRegistrations(page);
      });
  }

  public deleteRegistration(registrationId: number): Observable<void> {
    const url = `http://localhost:5000/registrations/${registrationId}`;
    this.storeService.setLoading(registrationId, true);

    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.storeService.registrations = this.storeService.registrations.filter(
          (reg) => reg.id !== registrationId
        );
      }),
      finalize(() => {
        this.storeService.setLoading(registrationId, false);
      })
    );
  }
}
