import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DecryptionService } from '../common/services/decryption.service';
import { ProjectsService } from './projects.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  projects: any = [];
  isError: boolean = false;

  constructor(private projectsService: ProjectsService,
    private decryptionService: DecryptionService
  ) { }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (response: any) => {
        if (response)
          this.projects = response.data.map((item: any) => this.decryptionService.decrypt(item))
        else
          this.isError = true
      },
      error: (error: any) => { this.isError = true, console.debug(error) }
    });
  }

  openProject(url?: string) {
    if (!url) return;
    window.open(url, '_blank');
  }
}
