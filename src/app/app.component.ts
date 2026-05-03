import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicService } from './common/services/public.service';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private publicService = inject(PublicService);

  ngOnInit(): void {
    this.publicService.getProjects();
    this.publicService.getSkills();
    this.publicService.getWork();
    this.publicService.getEducation();
  }
}
