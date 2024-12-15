import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ExamField, ExamStatus, IconType, ThemeType } from '../../../shared/types/exam.types';
import { Exam } from '../../../shared/models/exam.model';
import { ExamService } from '../../../core/services/exam.service';
import { EXAM_CONFIG } from '../../../shared/config/exam.config';
import { ExamCreateModalComponent } from '../app-exam-create-modal/app-exam-create-modal.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
	selector: 'app-exam-list',
	templateUrl: './exam-list.component.html',
	styleUrls: ['./exam-list.component.css'],
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ExamCreateModalComponent,
		BadgeComponent
	]
})
export class ExamListComponent implements OnInit, OnDestroy {
	protected exams: Exam[] = [];
	protected readonly examStatus = ExamStatus;
	private readonly examService = inject(ExamService);
	private readonly destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.loadExams();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	protected loadExams(): void {
		this.examService.getExams()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (data) => this.exams = data,
				error: () => this.exams = []
			});
	}

	protected getBadgeTheme(status: ExamStatus): ThemeType {
		return EXAM_CONFIG.STATUS_THEMES[status] as ThemeType;
	}

	protected getTextColor(status: ExamStatus): Record<string, boolean> {
		const colorClass = EXAM_CONFIG.STATUS_COLORS[status];
		return { [colorClass]: true };
	}

	protected getIcon(type: IconType, status?: ExamStatus): string {
		if (type === 'status' && status) {
			return EXAM_CONFIG.STATUS_ICONS[status];
		}

		if (type !== 'status') {
			return EXAM_CONFIG.GENERAL_ICONS[type];
		}

		return '';
	}

	protected getDisplayValue(exam: Exam, field: ExamField): string {
		if (exam.status === ExamStatus.IN_SEARCH) {
			return EXAM_CONFIG.PENDING_MESSAGE;
		}

		const fieldMapping: Record<ExamField, string | undefined> = {
			location: exam.location,
			date: exam.formattedDate,
			time: exam.formattedTime
		};

		return fieldMapping[field] ?? EXAM_CONFIG.PENDING_MESSAGE;
	}

	protected getStatus(status: string): ExamStatus {
		return status as ExamStatus;
	}
}