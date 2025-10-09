import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { LoadingService } from '../common/services/loading.service';
import { AboutService } from './about.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  email: string = 'kranthia24@gmail.com';
  isTooltip: boolean = false;
  work: any = [];
  education: any = [];
  loading$: any;

  constructor(private aboutService: AboutService,
    private readonly loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.loadingService.show();
    forkJoin([
      this.aboutService.getWork(),
      this.aboutService.getEducation()
    ]).subscribe(([workResponse, educationRespsonse]) => {
      this.work = workResponse;
      this.education = educationRespsonse;
      this.loadingService.hide()
    }, (error: any) => {
      console.log(error);
      this.loadingService.hide()
    });
  }

  copy() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.isTooltip = true;
      setTimeout(() => {
        this.isTooltip = false;
      }, 2000);
    });
  }
}
