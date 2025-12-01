import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about/about.service';
import { DecryptionService } from '../common/services/decryption.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit {

  education: any = [];

  constructor(private aboutService: AboutService,
    private decryptionService: DecryptionService
  ) { }

  ngOnInit(): void {
    this.aboutService.getEducation().subscribe({
      next: (response: any) => { this.education = response.map((item: any) => this.decryptionService.decrypt(item)) },
      error: (error: any) => { console.log(error) }
    });
  }
}
