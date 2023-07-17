import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLanguageEnglish = true; // replace with your language toggle logic
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.authService
      .checkLoggedIn()
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));
    this.translate.setDefaultLang('en');
  }
  logout() {
    this.authService.logout();
  }

  toggleLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ar' : 'en');
  }
}
