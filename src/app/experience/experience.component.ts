import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about/about.service';
import { DecryptionService } from '../common/services/decryption.service';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  work: any = [];
  isError: boolean = false;

  constructor(private aboutService: AboutService,
    private decryptionService: DecryptionService) { }

  ngOnInit(): void {
    this.aboutService.getWork().subscribe({
      next: (response: any) => {
        if (response)
          this.work = response.data.map((item: any) => this.decryptionService.decrypt(item))
        else
          this.isError = true
      },
      error: (error: any) => { this.isError = true }
    });
  }
}
