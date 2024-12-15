import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ExamCreate } from '../../../shared/models/exam-create.model';
import { ExamService } from '../../../core/services/exam.service';

@Component({
    selector: 'app-exam-create-modal',
    standalone: true,
    imports: [FormsModule, NgIf, NgClass],
    templateUrl: './app-exam-create-modal.component.html',
})
export class ExamCreateModalComponent {
    @Output() examCreated = new EventEmitter<void>();
    
    isOpen = false;
    isSubmitting = false;
    
    exam: ExamCreate = {
        studentName: '',
        date: '',
        time: '',
        location: '',
        status: 'À organiser'
    };

    constructor(private examService: ExamService) {}

    onSubmit() {
        if (this.isSubmitting) return;
        
        this.isSubmitting = true;
        
        this.examService.createExam(this.exam).subscribe({
            next: (response) => {
                this.closeModal();
                this.examCreated.emit();
            },
            error: (error) => {
                console.error('Error creating exam:', error);
                this.isSubmitting = false;
            }
        });
    }

    closeModal() {
        this.isOpen = false;
        this.resetForm();
        this.isSubmitting = false;
    }

    private resetForm() {
        this.exam = {
            studentName: '',
            location: '',
            date: '',
            time: '',
            status: 'À organiser'
        };
    }
}