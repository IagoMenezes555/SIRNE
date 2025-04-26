import { UpperCasePipe } from '@angular/common';
import { Component, computed, input, OnInit } from '@angular/core';
import { IonToolbar, IonTitle, IonHeader, IonButtons, IonButton, ModalController, IonAvatar, IonSpinner } from "@ionic/angular/standalone";
import { SettingsPage } from 'src/app/pages/settings/settings.page';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonSpinner,
    IonAvatar, 
    IonButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    UpperCasePipe
  ]
})
export class HeaderComponent  implements OnInit {
  public title = input<string>('');
  private currentAudio: HTMLAudioElement | null = null;
  public loadMenu = computed(() => this.menuService.loadMenu());

  constructor(
    private modalCtrl: ModalController,
    private menuService: MenuService
  ) { }

  ngOnInit() {}

  public openSettings() {
    this.modalCtrl.create({
      component: SettingsPage,
    }).then((m) => m.present());
  }

  public playKiam() {
    if (!this.currentAudio || this.currentAudio.paused) {
      this.currentAudio = new Audio("assets/kiam.mp3");
      this.currentAudio.play();
    }
  }
}
