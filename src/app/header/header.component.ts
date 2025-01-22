import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatMenuItem,
    RouterLinkActive
  ],
  standalone: true
})
export class HeaderComponent {
  public title: string = 'Stay Active, Stay Together';
  public imagePath: string = './../assets/images/sport.jpeg';

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
