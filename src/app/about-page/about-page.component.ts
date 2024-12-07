import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";


@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    HeaderComponent,
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
