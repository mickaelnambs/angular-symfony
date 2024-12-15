import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamListComponent } from '../exam/exam-list/exam-list.component';
import { ExamStatsService } from '../../core/services/exam-stats.service';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { StatsCardComponent } from '../../shared/components/stats-card/stats-card.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, ExamListComponent, BadgeComponent, StatsCardComponent],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
	protected examStats = inject(ExamStatsService);

	onExamCreated() {
        this.examStats.loadStats();
    }
}