import { ExamStatus } from "../types/exam.types";

export interface Exam {
    id?: number;
    studentName: string;
    location?: string;
    date?: string;
    time?: string;
    formattedDate?: string;
    formattedTime?: string;
    status: ExamStatus; 
}