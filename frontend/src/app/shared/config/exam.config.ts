import { ExamStatus } from '../types/exam.types';

export const EXAM_CONFIG = {
    PENDING_MESSAGE: 'En attente',
    STATUS_ICONS: {
        [ExamStatus.IN_SEARCH]: 'fa-solid fa-hourglass-start',
        [ExamStatus.CONFIRMED]: 'fa-solid fa-check',
        [ExamStatus.TO_ORGANIZE]: 'fa-solid fa-triangle-exclamation',
        [ExamStatus.CANCELLED]: 'fa-solid fa-xmark'
    },
    GENERAL_ICONS: {
        user: 'fa-regular fa-user',
        location: 'fa-solid fa-location-dot',
        calendar: 'fa-regular fa-calendar',
        clock: 'fa-regular fa-clock'
    },
    STATUS_THEMES: {
        [ExamStatus.IN_SEARCH]: 'primary',
        [ExamStatus.CONFIRMED]: 'success',
        [ExamStatus.TO_ORGANIZE]: 'warn',
        [ExamStatus.CANCELLED]: 'danger'
    },
    STATUS_COLORS: {
        [ExamStatus.IN_SEARCH]: 'text-blue-600',
        [ExamStatus.CONFIRMED]: 'text-green-600',
        [ExamStatus.TO_ORGANIZE]: 'text-orange-500',
        [ExamStatus.CANCELLED]: 'text-red-600'
    }
} as const;