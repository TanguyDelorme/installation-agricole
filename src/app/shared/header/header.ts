import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Routes} from '../../core/constants/routes';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
    RouterLink,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  protected readonly routesEvent = Routes;
}
