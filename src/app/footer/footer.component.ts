import { DatePipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  protected email: string = 'kranthia24@gmail.com';
  protected emailTooltip: boolean = false;
  protected resumeTooltip: boolean = false;
  protected tooltipLocked = false;
  protected updatedDate = new Date(2026, 6);

  protected copy(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.emailTooltip = true;
      setTimeout(() => {
        this.emailTooltip = false;
      }, 2000);
    });
  }

  protected openFile(): void {
    window.open('assets/files/Resume.pdf', '_blank');
  }

  protected onMouseEnter(): void {
    if (!this.tooltipLocked) {
      this.resumeTooltip = true;
    }
  }

  protected onMouseLeave(): void {
    if (!this.tooltipLocked) {
      this.resumeTooltip = false;
    }
  }

  protected toggleTooltip(): void {
    this.tooltipLocked = !this.tooltipLocked;
    this.resumeTooltip = this.tooltipLocked || this.resumeTooltip;
  }

  @HostListener('document:click', ['$event'])
  protected closeTooltip(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.info-icon')) {
      this.tooltipLocked = false;
      this.resumeTooltip = false;
    }
  }
}
