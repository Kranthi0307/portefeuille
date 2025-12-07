import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  email: string = 'kranthia24@gmail.com';
  emailTooltip: boolean = false;
  resumeTooltip: boolean = false;
  tooltipLocked = false;
  updatedDate = new Date(2025, 8);

  copy() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.emailTooltip = true;
      setTimeout(() => {
        this.emailTooltip = false;
      }, 2000);
    });
  }

  openFile() {
    window.open('assets/files/Resume.pdf', '_blank');
  }

  onMouseEnter() {
    if (!this.tooltipLocked) {
      this.resumeTooltip = true;
    }
  }

  onMouseLeave() {
    if (!this.tooltipLocked) {
      this.resumeTooltip = false;
    }
  }

  toggleTooltip() {
    this.tooltipLocked = !this.tooltipLocked;
    this.resumeTooltip = this.tooltipLocked || this.resumeTooltip;
  }

  @HostListener('document:click', ['$event'])
  closeTooltip(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.info-icon')) {
      this.tooltipLocked = false;
      this.resumeTooltip = false;
    }
  }
}
