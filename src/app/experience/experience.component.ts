import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-experience',
  imports: [DatePipe, ErrorComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  protected readonly public_service = inject(PublicService);
}
