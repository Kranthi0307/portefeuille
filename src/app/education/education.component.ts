import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ErrorComponent } from '../common/components/error/error.component';
import { WarningComponent } from '../common/components/warning/warning.component';
import { PublicService } from '../common/services/public.service';

const MODULES = [DatePipe]
const COMPONENTS = [ErrorComponent, WarningComponent]

@Component({
  selector: 'app-education',
  imports: [
    MODULES,
    COMPONENTS
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  protected readonly public_service = inject(PublicService);
}
