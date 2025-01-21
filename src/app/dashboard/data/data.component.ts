import { Component } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';


@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  // Speichert den aktuell expandierten Kurs
  public expandedCourseId: string | null = null;

  constructor(public storeService: StoreService) {}

  // Methode zum Umschalten des Toggles
  toggleCourse(courseId: string): void {
    this.expandedCourseId = this.expandedCourseId === courseId ? null : courseId;
  }
}
