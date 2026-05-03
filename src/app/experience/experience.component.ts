import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [DatePipe, ErrorComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  private publicService = inject(PublicService);

  protected work: any = this.publicService.work();

  ngOnInit(): void {
    this.publicService.getWork();
  }
}
