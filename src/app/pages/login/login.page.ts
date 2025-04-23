import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAvatar, IonItem, IonButton, ModalController, IonInput } from '@ionic/angular/standalone';
import { MenuService } from 'src/app/services/menu.service';
import { ProfileModalComponent } from 'src/app/components/profile-modal/profile-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent, 
    IonInput,
    IonAvatar,
    IonItem,
    FormsModule
  ]
})
export class LoginPage {
  public name: string = '';
  public appid: string = '';
  public appkey: string = '';

  constructor(
    private menuService: MenuService,
    private auth: AuthService,
    private modalCtrl: ModalController
  ) { }

  public async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileModalComponent,
    });
    await modal.present();
  }

  public login() {    
    this.auth.setLogin({ appid: this.appid, appkey: this.appkey, name: this.name });
    this.menuService.loadBackendless();
  }
}
