import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ErrorComponent } from '../common/components/error/error.component';
import { WarningComponent } from '../common/components/warning/warning.component';
import { PublicService } from '../common/services/public.service';

const MODULES = [DatePipe]
const COMPONENTS = [ErrorComponent, WarningComponent]

@Component({
  selector: 'app-experience',
  imports: [
    MODULES,
    COMPONENTS
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  protected readonly public_service = inject(PublicService);
}
