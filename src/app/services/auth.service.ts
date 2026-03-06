import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  message: string;
}

/**
 * Authentication Service
 * Handles login, token management, and authentication state.
 * Token is stored in localStorage for persistence across page reloads.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<string | null>(this.getStoredUsername());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Authenticate user and store JWT token
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('username', response.username);
          this.currentUserSubject.next(response.username);
        }
      })
    );
  }

  /**
   * Logout user and remove token
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }

  /**
   * Get stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get current username
   */
  getCurrentUsername(): string | null {
    return localStorage.getItem('username');
  }

  /**
   * Get stored username (for BehaviorSubject initialization)
   */
  private getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }
}
