import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about/about.service';
import { DecryptionService } from '../common/services/decryption.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {

  work: any = [];

  constructor(private aboutService: AboutService,
    private decryptionService: DecryptionService) { }

  ngOnInit(): void {
    this.aboutService.getWork().subscribe({
      next: (response: any) => { this.work = response.map((item: any) => this.decryptionService.decrypt(item)) },
      error: (error: any) => { console.log(error) }
    });
  }
}
