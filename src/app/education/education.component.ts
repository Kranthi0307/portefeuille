import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ErrorComponent } from '../common/components/error/error.component';
import { WarningComponent } from '../common/components/warning/warning.component';
import { DecryptionService } from '../common/services/decryption.service';
import { PublicService } from '../common/services/public.service';

@Component({
  selector: 'app-education',
  imports: [
    DatePipe,
    ErrorComponent,
    WarningComponent
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  protected readonly public_service = inject(PublicService);

  private readonly decryption_service = inject(DecryptionService);

  education: any = [];
  work: any = [];

  constructor() {
    forkJoin([
      this.public_service.getWork(),
      this.public_service.getEducation()
    ]).subscribe(([workResponse, educationRespsonse]) => {
      this.work = workResponse.data.map((item: any) => this.decryption_service.decrypt(item));
      this.education = educationRespsonse.data.map((item: any) => this.decryption_service.decrypt(item));
    }, (error: any) => {
      console.error(error);
    });
  }
}
