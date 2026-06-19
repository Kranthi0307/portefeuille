import { Component, inject } from '@angular/core';
import { ErrorComponent } from '../common/components/error/error.component';
import { PublicService } from '../common/services/public.service';
import { WarningComponent } from '../common/components/warning/warning.component';

const COMPONENTS = [ErrorComponent, WarningComponent]

@Component({
  selector: 'app-projects',
  imports: [COMPONENTS],
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
