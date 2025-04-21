import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, ModalController, IonCheckbox, AlertController } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { TaskService } from 'src/app/services/task.service';
import { TaskFormModalComponent } from 'src/app/components/task-form-modal/task-form-modal.component';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox, 
    IonButton, 
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent
  ]
})
export class TaskPage implements OnInit {
  public tasks = computed(() => this.taskService.tasks());

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private alertCrtl: AlertController
  ) { }

  ngOnInit() {
  }

  public async openTaskFormModal() {
    const modalref = await this.modalCtrl.create({
      component: TaskFormModalComponent,
    });

    modalref.present();

    modalref.onDidDismiss().then((data) => {
      const task = data.data as Task;
      
      if (task) {
        this.taskService.addTask(task);
      }
    });
  }

  public checkTask(taskId: string, status: boolean) {
    this.taskService.checkTask(taskId, status);
  }

  public async deleteTask(taskId: string) {
    const alertref = await this.alertCrtl.create({
      header: 'Confirmar Deletação',
      message: 'Tem certeza que deseja deletar está tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Deletar',
          handler: () => {
            this.taskService.removeTask(taskId);
          }
        }
      ]
    });
    
    await alertref.present();
  }
}
