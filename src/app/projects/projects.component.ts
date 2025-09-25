import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ProjectsService } from './projects.service';
import { LoadingService } from '../common/services/loading.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  projects: any = [];
  loading$: any;

  constructor(private projectsService: ProjectsService,
    private readonly loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.projectsService.getProjects().subscribe({
      next: (response: any) => { this.projects = response, this.loadingService.hide() },
      error: (error: any) => { console.log(error), this.loadingService.hide() }
    });
  }
}
