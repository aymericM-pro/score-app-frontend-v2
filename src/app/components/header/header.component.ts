import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, Language } from '@app/services/language.service';
import { ButtonComponent } from '@app/components/desing-system/button/fsButton.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public languageService: LanguageService) {}

  setLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }
}
