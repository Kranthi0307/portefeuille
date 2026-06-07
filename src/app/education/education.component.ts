import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [DatePipe, ErrorComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {

  private publicService = inject(PublicService);

  protected education: any = this.publicService.education;
}
