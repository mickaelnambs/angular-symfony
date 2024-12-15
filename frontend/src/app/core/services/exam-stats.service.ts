import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ExamStats } from '../../shared/models/exam-stats.model';

@Injectable({
    providedIn: 'root'
})
export class ExamStatsService {
    stats = signal<ExamStats>({
        confirmed: 0,
        toOrganize: 0,
        cancelled: 0,
        inSearch: 0
    });

    constructor(private http: HttpClient) {
        this.loadStats();
    }

    loadStats() {
        this.http.get<ExamStats>(`${environment.apiUrl}exams/stats`).subscribe({
            next: (stats) => {
                this.stats.set(stats);
            }
        });
    }
}