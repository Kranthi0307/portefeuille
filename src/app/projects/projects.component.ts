import { Component, inject, OnInit } from '@angular/core';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  private publicService = inject(PublicService);

  protected projects: any = this.publicService.projects();

  ngOnInit(): void {
    this.publicService.getProjects();
  }

  openProject(url?: string) {
    if (!url) return;
    window.open(url, '_blank');
  }
}
