import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showTooltip = false;
  updatedDate = new Date(2025, 8);
}
