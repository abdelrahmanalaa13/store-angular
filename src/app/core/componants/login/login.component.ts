import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { first } from 'rxjs/operators';

// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  currentRole: string = '';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.currentRole = this.authService.getCurrentRole();
    this.currentRole && this.redirectByRole();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe((role: string) => {
        this.currentRole = role;
        if (role) {
          this.redirectByRole();
          this.error = '';
        } else {
          this.error = 'Invalid credentials';
        }
      });
  }

  redirectByRole() {
    this.router.navigate([this.currentRole === 'admin' ? '/admin' : '/shop']);
  }
}
