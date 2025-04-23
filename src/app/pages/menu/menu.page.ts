import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { MenuDatabase } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    CardComponent
  ],
})
export class MenuPage {
  public menu = computed(() => this.menuService.menu());
  public menuDatabase: MenuDatabase[] = [];

  constructor(
    private menuService: MenuService,
  ) { }
}
