import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

type AppLanguage = 'en' | 'fr' | 'es';

@Component({
  selector: 'app-header',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideDown', [
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-20px)',
        maxHeight: '0px',
        overflow: 'hidden',
        pointerEvents: 'none'
      })),
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)',
        maxHeight: '500px',
        overflow: 'hidden',
        pointerEvents: 'auto'
      })),
      transition('closed <=> open', animate('300ms ease-out'))
    ])
  ]
})
export class HeaderComponent {

  protected is_open = false;
  protected current_language: AppLanguage = 'en';

  constructor(private translate_service: TranslateService) {
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage === 'en' || savedLanguage === 'fr' || savedLanguage === 'es') {
      this.current_language = savedLanguage;
    }

    this.setLanguage(this.current_language);
  }

  protected setLanguage(language: AppLanguage): void {
    this.current_language = language;
    this.translate_service.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  protected onLanguageChange(event: Event): void {
    const language = (event.target as HTMLSelectElement).value as AppLanguage;
    this.setLanguage(language);
  }

  protected toggleMenu() {
    this.is_open = !this.is_open;
  }

  protected closeMenu() {
    this.is_open = false;
  }
}
