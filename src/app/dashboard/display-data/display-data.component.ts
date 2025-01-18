import { Component } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatIcon } from '@angular/material/icon';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css'],
  standalone: true,
  imports:
    [
      NgClass,
      NgForOf,
      NgIf,
      MatIcon,
      DatePipe,
      MatProgressSpinner
    ],
})
export class DisplayDataComponent {
  public page: number = 0;

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  selectPage(page: number): void {
    this.page = page;
    this.storeService.currentPage = page;
    this.backendService.getRegistrations(page);
  }

  public returnAllPages(): number[] {
    const pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }

  deleteRegistration(registrationId: number): void {
    this.backendService.deleteRegistration(registrationId).subscribe();
  }
}
