import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonContent, ModalController } from "@ionic/angular/standalone";
import { Assessment } from 'src/app/models/assessment';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.scss'],
  imports: [
    IonContent,
    CommonModule
  ]
})
export class AssessmentModalComponent {
  @Input() menu: Menu = { day: '', id: '', idLunch: '', idSnack: '' };
  @Input() snackAssessment: 'like' | 'deslike' | 'null' = 'null';
  @Input() lunchAssessment:  'like' | 'deslike' | 'null' = 'null';

  constructor(
    private modalCtrl: ModalController
  ) { }

  public assess(value: 'like' | 'deslike', type: 'snack' | 'lunch') {
    type === 'snack' ? this.snackAssessment = value : this.lunchAssessment = value;

    const assessment: Assessment = { assessment: value, menu: this.menu, type: type };
    this.modalCtrl.dismiss(assessment);
  }
}
