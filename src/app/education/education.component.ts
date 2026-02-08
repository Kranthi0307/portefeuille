import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about/about.service';
import { DecryptionService } from '../common/services/decryption.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit {

  education: any = [];
  isError: boolean = false;

  constructor(private aboutService: AboutService,
    private decryptionService: DecryptionService
  ) { }

  ngOnInit(): void {
    this.aboutService.getEducation().subscribe({
      next: (response: any) => {
        if (response)
          this.education = response.data.map((item: any) => this.decryptionService.decrypt(item))
        else
          this.isError = true
      },
      error: (error: any) => { this.isError = true }
    });
  }
}
