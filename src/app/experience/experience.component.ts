import { Component, inject } from '@angular/core';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [DatePipe, ErrorComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

  private publicService = inject(PublicService);

  protected work: any = this.publicService.work();
}
