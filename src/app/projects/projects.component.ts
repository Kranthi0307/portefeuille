import { Component, inject } from '@angular/core';
import { ErrorComponent } from '../common/components/error/error.component';
import { WarningComponent } from '../common/components/warning/warning.component';
import { PublicService } from '../common/services/public.service';

@Component({
  selector: 'app-projects',
  imports: [
    ErrorComponent,
    WarningComponent
  ],
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
