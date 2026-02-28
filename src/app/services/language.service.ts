import { Injectable, signal } from '@angular/core';
import { translations } from '@app/i18n/translations';

export type Language = 'fr' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  currentLanguage = signal<Language>('fr');

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLanguage() === 'fr' ? 'en' : 'fr';
    this.setLanguage(newLang);
  }

  t(key: string): string {
    const lang = this.currentLanguage();
    const keys = key.split('.');
    let result: any = translations[lang];
    for (const k of keys) {
      result = result?.[k];
    }
    return typeof result === 'string' ? result : key;
  }
}
