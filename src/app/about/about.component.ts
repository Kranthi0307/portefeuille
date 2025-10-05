import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    setTimeout(() => {
      this.work = [
        { "title": "Full-stack Developer", "company": "Remote", "description": "Working as a Full Stack Developer, building scalable, high-performance web applications using modern frameworks and microservices-based architectures. Involved in the complete software development lifecycle from system design and development to deployment and monitoring.", "startDate": "September 2024", "endDate": "Present", "location": "Remote" },
        { "title": "Exam Support Assistant | Student Accessibility Center", "company": "Dalhousie University", "description": "I provide direct support to students registered with the Student Accessibility Centre during exams, ensuring equitable access and a fair testing environment. My role focuses on fostering inclusion, maintaining academic integrity, and delivering student-centred support.", "startDate": "September 2024", "endDate": "Present", "location": "On-site" },
        { "title": "Software Developer", "company": "SoWeDid Solutions", "description": "As a Software Developer Trainee, I contributed to full-stack application development, working across backend, frontend, and database layers. I gained hands-on experience with modern web technologies and collaborated with cross-functional teams to enhance system performance and scalability.", "startDate": "October 2020", "endDate": "May 2023", "location": "On-site" }
      ];
      this.education = [
        { "school": "Dalhousie University", "degree": "Master of Engineering - MEng", "field": "Internetworking", "description": "Pursued a comprehensive program focused on the design, implementation, and management of complex networked systems. Gained in-depth knowledge of networking technologies, protocols, and architectures, along with hands-on experience in secure and scalable network design.", "startDate": "September 2023", "endDate": "May 2025" },
        { "school": "R.M.D ENGINEERING COLLEGE", "degree": "Bachelor of Engineering - BE", "field": "Electrical and Electronics Engineering", "description": "Developed a strong technical foundation in electrical and electronics engineering with a deep interest in laboratory work, programming, and practical experimentation. Coursework emphasized the design, analysis, and implementation of electrical and electronic circuits, renewable energy systems, and automation technologies.", "startDate": "June 2016", "endDate": "September 2020" }
      ];
    }, 2000);
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
