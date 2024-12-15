import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StatsCardComponent {
  @Input('theme')
  public theme: 'warn' | 'danger' | 'success' | 'primary' = 'primary';
  @Input('icon')
  public icon!: string;
  @Input('count')
  public count!: number;

  public readonly themes = {
    'success': 'text-green-600',
    'warn': 'text-orange-500',
    'primary': 'text-blue-500',
    'danger': 'text-rose-600',
  }
}