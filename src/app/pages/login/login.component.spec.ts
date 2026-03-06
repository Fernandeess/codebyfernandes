import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'isAuthenticated',
      'getToken'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to admin if already authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should submit form with valid credentials', () => {
    authService.isAuthenticated.and.returnValue(false);
    authService.login.and.returnValue(of({ token: 'jwt-token', username: 'admin', message: 'Success' }));

    fixture.detectChanges();

    component.form.patchValue({
      username: 'admin',
      password: 'admin123'
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({
      username: 'admin',
      password: 'admin123'
    });
  });

  it('should display error message on login failure', () => {
    authService.isAuthenticated.and.returnValue(false);
    authService.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

    fixture.detectChanges();

    component.form.patchValue({
      username: 'wrong',
      password: 'wrong'
    });

    component.onSubmit();

    fixture.detectChanges();

    expect(component.error).toContain('Invalid');
  });
});
