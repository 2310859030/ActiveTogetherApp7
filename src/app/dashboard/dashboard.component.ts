import { Component } from '@angular/core';
import {DataComponent} from "./data/data.component";
import {AddDataComponent} from "./add-data/add-data.component";
import {DisplayDataComponent} from "./display-data/display-data.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    DataComponent,
    AddDataComponent,
    DisplayDataComponent,
    CommonModule
  ],
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  public showForm = true;
}
