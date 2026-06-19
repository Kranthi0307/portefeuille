import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warning',
  imports: [],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.scss'
})
export class WarningComponent {
  @Input() is_warning: boolean = false;
}
