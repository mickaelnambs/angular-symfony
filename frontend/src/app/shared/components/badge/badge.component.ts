import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-badge',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './badge.component.html'
})
export class BadgeComponent {
	@Input() icon: string = '';
	@Input() theme: 'success' | 'warn' | 'danger' | 'primary' = 'primary';

	getThemeClasses() {
		const themes = {
			success: 'bg-green-100 text-green-700 border border-green-200',
			warn: 'bg-orange-100 text-orange-700 border border-orange-200',
			danger: 'bg-red-100 text-red-700 border border-red-200',
			primary: 'bg-blue-100 text-blue-700 border border-blue-200'
		};
		return themes[this.theme];
	}
}