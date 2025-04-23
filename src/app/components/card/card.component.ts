import { Component, input, OnInit } from '@angular/core';
import { Meal, Menu } from 'src/app/models/menu';
import { ModalController } from '@ionic/angular/standalone';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { NutritionalInformationModalComponent } from '../nutritional-information-modal/nutritional-information-modal.component';
import { AssessmentModalComponent } from '../assessment-modal/assessment-modal.component';
import { AssessmentService } from 'src/app/services/assessment.service';

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
  
  public snack: Meal = { assessment: 0, calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '' };
  public lunch: Meal = { assessment: 0, calories: 0, carbohydrates: 0, glucose: 0, id: '', lactose: false, name: '', objectId: '' };

  constructor(
    private menuService: MenuService,
    private assessmentService: AssessmentService,
    private modalCtrl: ModalController,
  ) {}
  
  ngOnInit() {
    this.loadMeal();
  }
  
  public loadMeal() {
    const snack = this.menuService.getMealId(this.menu().idSnack);
    const lunch = this.menuService.getMealId(this.menu().idLunch);

    if (snack) this.snack = snack;
    if (lunch) this.lunch = lunch;
  }

  public async openAssessmentDialog(menu: Menu) {
    const modalref = await this.modalCtrl.create({
      component: AssessmentModalComponent,
      componentProps: {
        menu: menu,
        snackAssessment: this.assessmentService.getAssessment(menu, 'snack'),
        lunchAssessment: this.assessmentService.getAssessment(menu, 'lunch'),
      },
      cssClass: 'assessment-modal'
    });

    modalref.present();

    modalref.onDidDismiss().then((data) => {
      if (data.data) {
        this.assessmentService.assess(data.data);
      }
    });
  }

  public async openNutritionalInfoDialog() {
    const modalref = await this.modalCtrl.create({
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
