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
      name: 'Project-1',
      description: 'description of Project-1.',
      link: 'https://github.com/Kranthi0307/rendez-vous-core'
    },
    {
      name: 'Project-2',
      description: 'description of Project-2.',
      link: 'https://github.com/Kranthi0307/rendez-vous-core'
    },
    {
      name: 'Project-3',
      description: 'description of Project-3.',
      link: 'https://github.com/Kranthi0307/rendez-vous-core'
    }
  ]
}
