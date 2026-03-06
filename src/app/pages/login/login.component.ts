import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect to admin if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
    }

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        // Redirect to admin dashboard or intended page
        const redirectUrl = sessionStorage.getItem('redirectUrl') || '/admin';
        sessionStorage.removeItem('redirectUrl');
        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        this.error = 'Invalid username or password';
        this.loading = false;
      }
    });
  }
}
