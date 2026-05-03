import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [DatePipe, ErrorComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit {

  private publicService = inject(PublicService);

  protected education: any = this.publicService.education();

  ngOnInit(): void {
    this.publicService.getEducation();
  }
}
