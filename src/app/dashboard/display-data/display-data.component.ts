import { Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {DatePipe, CommonModule} from "@angular/common";

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css'],
  imports: [
    MatSort,
    MatSortModule,
    MatProgressSpinner,
    DatePipe,
    CommonModule,
  ],
  standalone: true
})
export class DisplayDataComponent {
  @ViewChild(MatSort) sort!: MatSort;
  public page: number = 0;

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  get sortedRegistrations() {
    const registrations = [...this.storeService.registrations];
    if (this.sort?.active === 'registrationDate' && this.sort?.direction) {
      return registrations.sort((a, b) => {
        const dateA = new Date(a.registrationDate).getTime();
        const dateB = new Date(b.registrationDate).getTime();
        return this.sort.direction === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
    return registrations;
  }

  onSortChange(sortState: Sort): void {
    console.log(`Sortierzustand geändert: ${sortState.active}, Richtung: ${sortState.direction}`);
  }

  selectPage(page: number, event?: Event): void {
    if (event) {
      event.preventDefault(); // Verhindert das Standardverhalten des Links
    }

    const totalPages = this.returnAllPages().length;
    if (page < 1 || page > totalPages) {
      return;
    }

    this.page = page;
    this.storeService.currentPage = page;
    this.storeService.registrationLoading = true;

    this.backendService.getRegistrations(page);
  }

  public returnAllPages(): number[] {
    if (this.storeService.registrationTotalCount > 0) {
      const pagesCount = Math.ceil(this.storeService.registrationTotalCount / 4);
      return Array.from({length: pagesCount}, (_, i) => i + 1);
    }
    return [];
  }

  deleteRegistration(registrationId: number): void {
    this.backendService.deleteRegistration(registrationId).subscribe();
  }
}
