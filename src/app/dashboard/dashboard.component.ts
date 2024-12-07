import { Component } from '@angular/core';
import { DataComponent } from './data/data.component';
import { AddDataComponent } from './add-data/add-data.component';
import {DisplayDataComponent} from "./display-data/display-data.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataComponent, AddDataComponent, DisplayDataComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
