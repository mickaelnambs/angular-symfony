import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExamCreate } from '../../shared/models/exam-create.model';
import { Observable, catchError, tap } from 'rxjs';
import { ExamStatsService } from './exam-stats.service';
import { environment } from '../../environments/environment.development';
import { Exam } from '../../shared/models/exam.model';
import { ExamResponse } from '../../shared/models/exam-response.model';

@Injectable({
    providedIn: 'root'
})
export class ExamService {
    private readonly apiUrl = `${environment.apiUrl}exams`;

    constructor(
        private http: HttpClient,
        private examStatsService: ExamStatsService
    ) { }

    getExams(): Observable<Exam[]> {
        return this.http.get<Exam[]>(this.apiUrl)
          .pipe(
            catchError((error) => {
              console.error('Failed to fetch exams:', error);
              throw error;
            })
          );
      }

    createExam(examData: ExamCreate): Observable<ExamResponse> {
        const formattedData = this.formatExamData(examData);

        return this.http.post<ExamResponse>(this.apiUrl,
            formattedData
        ).pipe(
            tap(() => this.examStatsService.loadStats())
        );
    }

    private formatExamData(exam: ExamCreate) {
        return {
            ...exam,
            date: `${exam.date}T00:00:00+00:00`,
            time: `1970-01-01T${exam.time}:00+00:00`
        };
    }
}