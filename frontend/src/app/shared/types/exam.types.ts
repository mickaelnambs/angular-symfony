export enum ExamStatus {
    IN_SEARCH = 'En recherche de place',
    CONFIRMED = 'Confirmé',
    TO_ORGANIZE = 'À organiser',
    CANCELLED = 'Annulé'
}

export type GeneralIconType = 'user' | 'location' | 'calendar' | 'clock';
export type IconType = GeneralIconType | 'status';
export type ThemeType = 'primary' | 'success' | 'warn' | 'danger';
export type ExamField = 'location' | 'date' | 'time';