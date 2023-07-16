import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLanguageEnglish = true; // replace with your language toggle logic

  toggleLanguage() {
    this.isLanguageEnglish = !this.isLanguageEnglish;
    // add logic to change language
  }

  logout() {
    // add logic to handle logout
  }
}
