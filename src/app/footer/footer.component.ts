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
  protected email_tooltip: boolean = false;
  protected resume_tooltip: boolean = false;
  protected tooltip_locked = false;
  protected updated_date = new Date(2026, 9);
  private git_hub_url = 'https://github.com/Kranthi0307';
  private resume_url = 'assets/files/Resume.pdf';

  protected copy(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      this.email_tooltip = true;
      setTimeout(() => {
        this.email_tooltip = false;
      }, 2000);
    });
  }

  protected openFile(): void {
    window.open(this.resume_url, '_blank');
  }

  protected onMouseEnter(): void {
    if (!this.tooltip_locked) {
      this.resume_tooltip = true;
    }
  }

  protected onMouseLeave(): void {
    if (!this.tooltip_locked) {
      this.resume_tooltip = false;
    }
  }

  protected toggleTooltip(): void {
    this.tooltip_locked = !this.tooltip_locked;
    this.resume_tooltip = this.tooltip_locked || this.resume_tooltip;
  }

  @HostListener('document:click', ['$event'])
  protected closeTooltip(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.info-icon')) {
      this.tooltip_locked = false;
      this.resume_tooltip = false;
    }
  }
}
