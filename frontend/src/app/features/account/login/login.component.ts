import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	private fb = inject(FormBuilder);
	private authService = inject(AuthService);
	private router = inject(Router);

	isLoading = false;
	errorMessage = '';

	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]]
	});

	ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        }
    }

	onSubmit() {
		if (this.loginForm.valid) {
			this.isLoading = true;
			this.errorMessage = '';

			const { email, password } = this.loginForm.getRawValue();

			const credentials = {
				email: email as string,
				password: password as string
			};

			this.authService.login(credentials).subscribe({
				next: (response) => {
					if (response.token) {
						this.router.navigateByUrl('dashboard', { replaceUrl: true });
					}
				},
				error: (error) => {
					this.isLoading = false;
					this.errorMessage = error.error?.message || 'Login failed. Please try again.';
				},
				complete: () => {
					this.isLoading = false;
				}
			});
		}
	}
}
