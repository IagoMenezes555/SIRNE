import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';

StatusBar.setOverlaysWebView({ overlay: false });
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  public darkMode = false;
  
  constructor() {
    this.initializeApp();
  }

  public initializeApp() {
    this.initTheme();
  }

  private initTheme() {
    const storedTheme = localStorage.getItem('dark-mode');

    if (storedTheme) {
      const theme = JSON.parse(storedTheme);

      if (theme) {
        document.documentElement.classList.add('app-dark');
        StatusBar.setBackgroundColor({ color: '#ff6600' });
        StatusBar.setStyle({ style: Style.Dark });
      } else {
        document.documentElement.classList.add('app-light');
        StatusBar.setBackgroundColor({ color: '#ff6600' });
        StatusBar.setStyle({ style: Style.Dark });
      }
    } else {
      document.documentElement.classList.add('app-light');
      localStorage.setItem('dark-mode', 'false');
    }
  }
}
