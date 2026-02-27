import { Component, model, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  activeView = model<'standings' | 'calendar'>('standings');
  leagueId = input<string>('ligue-1');
}
