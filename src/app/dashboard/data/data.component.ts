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
  constructor(public storeService: StoreService) {}
}
