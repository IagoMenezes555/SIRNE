import { Component, input, OnInit } from '@angular/core';
import { Meal, Menu } from 'src/app/models/menu';
import { ModalController } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { NutritionalInformationModalComponent } from '../nutritional-information-modal/nutritional-information-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    UpperCasePipe,
    FormsModule,
  ],
})
export class CardComponent implements OnInit {
  public menu = input.required<Menu>();
  public snacks = input.required<Meal[]>();
  public lunches = input.required<Meal[]>();
  
  public snack: Meal = { assessment: 0, calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '' };
  public lunch: Meal = { assessment: 0, calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '' };
  

  constructor(
    private menuService: MenuService,
    private modalController: ModalController
  ) {}
  
  ngOnInit() {
    this.loadMeal();
  }
  
  public loadMeal() {    
    this.snack = this.menuService.getMealId(this.menu().idSnack)!;
    this.lunch = this.menuService.getMealId(this.menu().idLunch)!;
  }

  public async openNutritionalInfoDialog() {
    const modalref = await this.modalController.create({
      component: NutritionalInformationModalComponent,
      componentProps: {
        snack: this.snack,
        lunch: this.lunch,
      },
      cssClass: 'nutritional-modal'
    });

    modalref.present();
  }
}
