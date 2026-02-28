import { Component, input, output, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DropdownItem {
    value: string | number;
    label: string;
}

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './fsDropdown.component.html',
})
export class DropdownComponent {
    items = input.required<DropdownItem[]>();
    selected = input<DropdownItem | null>(null);
    placeholder = input<string>('Sélectionner');
    disabled = input<boolean>(false); /** Nouveau */
    variant = input<'primary' | 'ghost'>('primary');
    selectedChange = output<DropdownItem>();

    isOpen = signal(false);

    toggle() {
        if (!this.disabled()) {
            this.isOpen.set(!this.isOpen());
        }
    }

    select(item: DropdownItem) {
        this.selectedChange.emit(item);
        this.isOpen.set(false);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('app-dropdown')) {
            this.isOpen.set(false);
        }
    }
}
