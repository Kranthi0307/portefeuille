import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DecryptionService } from '../common/services/decryption.service';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  projects: any = [];

  constructor(private projectsService: ProjectsService,
    private decryptionService: DecryptionService
  ) { }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (response: any) => { this.projects = response.map((item: any) => this.decryptionService.decrypt(item)) },
      error: (error: any) => { console.log(error) }
    });
  }

  openProject(url?: string) {
    if (!url) return;
    window.open(url, '_blank');
  }
}
