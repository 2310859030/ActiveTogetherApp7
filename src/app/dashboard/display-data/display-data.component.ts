import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css'],
  standalone: true,
  imports: [NgClass, NgForOf], // Wichtige Angular-Direktiven importieren
})
export class DisplayDataComponent {
  constructor(public storeService: StoreService, private backendService: BackendService) {}

  public page: number = 0;

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

}
