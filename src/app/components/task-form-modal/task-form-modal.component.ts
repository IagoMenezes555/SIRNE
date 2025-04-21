import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonInput, IonItem } from '@ionic/angular/standalone';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
  imports: [IonItem, IonInput, IonContent, 
    IonToolbar,
    IonButtons,
    IonButton,
    IonHeader, 
    IonTitle,
    FormsModule
  ]
})
export class TaskFormModalComponent  implements OnInit {
  @Input() task!: Task;

  public taskSel: Task = { name: '', check: false, end: new Date(), id: '', description: '', inital: new Date }

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  public cancelModal() {
    this.modalCtrl.dismiss();
  }

  public confirmModal() {
    this.modalCtrl.dismiss(this.taskSel);
  }
}
