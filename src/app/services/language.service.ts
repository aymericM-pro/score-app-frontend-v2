import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'fr' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage = signal<Language>('fr');

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    this.translate.use(lang);
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage() === 'fr' ? 'en' : 'fr';
    this.setLanguage(newLang);
  }
}
