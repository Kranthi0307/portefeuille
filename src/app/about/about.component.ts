import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone:true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  work: any = [];
  education: any = [];

  ngOnInit(): void {
    this.work = [
      { "title": "Full-stack Developer", "company": "Remote", "description": "Test-1" },
      { "title": "Exam Support Assistant | Student Accessibility Center", "company": "Dalhousie University", "description": "Test-2" },
      { "title": "Software Developer", "company": "SoWeDid Solutions", "description": "Test-3" }
    ];
    this.education = [
      { "school": "Dalhousie University", "degree": "Master of Engineering - MEng", "field": "Internetworking", "description": "Test-1", "startDate": "September 2023", "endDate": "May 2025" },
      { "school": "R.M.D ENGINEERING COLLEGE", "degree": "Bachelor of Engineering - BE", "field": "Electrical and Electronics Engineering", "description": "Test-2", "startDate": "June 2016", "endDate": "September 2020" }
    ];
  }
}
