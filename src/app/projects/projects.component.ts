import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (response: any) => console.log(response),
      error: (error: any) => console.log(error)
    });
  }

  projects = [
    {
      name: 'My Portfolio',
      description: 'This is a display of my expertise, seamlessly showcasing in action.',
      link: 'https://github.com/Kranthi0307/portefeuille'
    },
    {
      name: 'B2BKaro',
      description: 'An e-commerce website that I am contributing as a freelancer.',
      link: 'https://b2bkaro.com/b2bkaro/login'
    },
    {
      name: 'Boulanger',
      description: 'An e-commerce related insurance wesite that I am contributing as a freelancer.',
      link: 'https://www.boulanger.com/'
    },
    {
      name: 'rendez-vous',
      description: 'A website that is used for seamless booking of appointments to specific doctor. This is an under-developed website which is yet to be deployed.',
      link: 'https://github.com/Kranthi0307'
    },
    {
      name: 'elasticsearch',
      description: 'An open source project that I am exploring to contribute.',
      link: 'https://github.com/Kranthi0307/elasticsearch'
    }
  ]
}
