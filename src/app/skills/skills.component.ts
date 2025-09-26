import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SkillsService } from './skills.service';
import { LoadingService } from '../common/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {

  skills: any = [];
  loading$: any;

  constructor(private skillsService: SkillsService,
    private readonly loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.skillsService.getSkills().subscribe({
      next: (response: any) => { this.skills = response, this.loadingService.hide() },
      error: (error: any) => { console.log(error), this.loadingService.hide() }
    });
  }
}
