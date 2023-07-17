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
  currentLang: 'en' | 'ar' = 'en';
  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.use('en');
  }

  ngOnInit() {
    this.authService
      .checkLoggedIn()
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));
  }
  logout() {
    this.authService.logout();
  }

  toggleLanguage() {
    if (this.translate.currentLang === 'en') {
      this.translate.use('ar');
      document.body.dir = 'rtl';
    } else {
      this.translate.use('en');
      document.body.dir = 'ltr';
    }
  }
}
