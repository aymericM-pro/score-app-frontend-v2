import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'filter' | 'nav' | 'lang' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fsButton.component.html',
})
export class ButtonComponent {
  label     = input<string>('');
  variant   = input<ButtonVariant>('primary');
  size      = input<ButtonSize>('md');
  active    = input<boolean>(false);
  disabled  = input<boolean>(false);
  loading   = input<boolean>(false);
  fullWidth = input<boolean>(false);
  type      = input<'button' | 'submit' | 'reset'>('button');

  clicked = output<void>();

  onClick() {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit();
    }
  }

  get classes(): string {
    const sizes: Record<ButtonSize, string> = {
      xs: 'px-2 py-1 text-xs rounded-md',
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-5 py-2.5 text-base rounded-lg',
      xl: 'px-6 py-3 text-lg rounded-xl',
    };

    const variants: Record<ButtonVariant, string> = {
      primary:   'bg-[#00d9ff] text-black font-bold hover:bg-[#00c4e6]',
      secondary: 'bg-[#2a2a2a] text-white border border-[#3a3a3a] hover:bg-[#3a3a3a]',
      filter:    this.active()
                   ? 'bg-[#00d9ff] text-black font-semibold border border-[#00d9ff]'
                   : 'bg-[#2a2a2a] text-[#b0b0b0] font-semibold border border-[#3a3a3a] hover:bg-[#00d9ff] hover:text-black',
      nav:       this.active()
                   ? 'bg-[#00d9ff] text-black font-medium'
                   : 'text-white font-medium hover:bg-[#2a2a2a]',
      lang:      this.active()
                   ? 'bg-[#00d9ff] text-black font-semibold rounded'
                   : 'text-white hover:bg-[#00d9ff] hover:text-black rounded',
      ghost:     'bg-transparent text-[#00d9ff] border border-[#00d9ff] hover:bg-[#00d9ff]/10',
      danger:    'bg-red-600 text-white font-bold hover:bg-red-700',
    };

    return [
      'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none',
      sizes[this.size()],
      variants[this.variant()],
      this.fullWidth() ? 'w-full' : '',
      (this.disabled() || this.loading()) ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
    ].join(' ');
  }
}