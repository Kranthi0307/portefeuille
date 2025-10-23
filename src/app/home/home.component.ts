import { Component, HostListener } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showTooltip = false;
  tooltipLocked = false;
  updatedDate = new Date(2025, 8);

  onMouseEnter() {
    if (!this.tooltipLocked) {
      this.showTooltip = true;
    }
  }

  onMouseLeave() {
    if (!this.tooltipLocked) {
      this.showTooltip = false;
    }
  }

  toggleTooltip() {
    this.tooltipLocked = !this.tooltipLocked;
    this.showTooltip = this.tooltipLocked || this.showTooltip;
  }

  @HostListener('document:click', ['$event'])
  closeTooltip(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.info-icon')) {
      this.tooltipLocked = false;
      this.showTooltip = false;
    }
  }
}
