import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  email: string = 'kranthia24@gmail.com';
  isTooltip: boolean = false;
  work: any = [];
  education: any = [];
  loading$: any;

  copy() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.isTooltip = true;
      setTimeout(() => {
        this.isTooltip = false;
      }, 2000);
    });
  }
}
