import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = [
    {
      name: 'My Portfolio',
      description: 'This is a display of my expertise, seamlessly showcasing in action.',
      link: 'https://github.com/Kranthi0307/portefeuille'
    },
    {
      name: 'rendez-vous',
      description: 'A website that is used for seamless booking of appointments to specific doctor.',
      link: 'https://github.com/Kranthi0307'
    },
    {
      name: 'elasticsearch',
      description: 'An open source project that I am contributing.',
      link: 'https://github.com/Kranthi0307/elasticsearch'
    }
  ]
}
