import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '@app/services/language.service';
import { ButtonComponent } from '@app/components/desing-system/button/fsButton.component';
import {DropdownComponent,DropdownItem,} from '@app/components/desing-system/dropdown/fsDropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DropdownComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public languageService: LanguageService) {}

  langItems = computed<DropdownItem[]>(() =>
    ['fr', 'en'].map((l) => ({
      value: l,
      label: l.toUpperCase(),
    }))
  );

  selectedLangItem = computed<DropdownItem | null>(() => {
    const lang = this.languageService.currentLanguage();
    return lang
      ? { value: lang, label: lang.toUpperCase() }
      : null;
  });

  changeLang(item: DropdownItem) {
    this.languageService.setLanguage(item.value as any);
  }
}