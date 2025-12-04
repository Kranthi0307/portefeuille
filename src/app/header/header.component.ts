import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideDown', [
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-50px)',
        display: 'none'
      })),
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)',
        display: 'flex'
      })),
      transition('closed <=> open', animate('300ms ease-out'))
    ])
  ]
})
export class HeaderComponent {
  isOpen = false;
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  closeMenu() {
    this.isOpen = false;
  }
}
