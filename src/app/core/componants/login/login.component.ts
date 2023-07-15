import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe((role) => {
        if (role) {
          console.log("logged-in");
          this.error = '';
        } else {
          this.error = 'Invalid credentials';
        }
      });
  }
}
