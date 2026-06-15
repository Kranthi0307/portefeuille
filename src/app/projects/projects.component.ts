import { Component, inject } from '@angular/core';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-projects',
  imports: [ErrorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  protected readonly public_service = inject(PublicService);

  protected openProject(url?: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }
}
