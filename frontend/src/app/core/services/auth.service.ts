import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginCredentials } from '../../shared/models/auth.model';

interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = environment.apiUrl;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
	private http = inject(HttpClient);

    private hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    login(credentials: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}login_check`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    getAuthStatus(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
    }

    checkAuth(): void {
        const token = this.getToken();
        this.isAuthenticatedSubject.next(!!token);
    }
}