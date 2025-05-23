import { Component, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, ModalController, IonCheckbox, AlertController, IonSearchbar } from '@ionic/angular/standalone';
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
    HeaderComponent,
    IonSearchbar
  ]
})
export class TaskPage implements OnInit {
  public tasks = computed(() => this.taskService.tasks());
  public completedTasks = computed(() => this.taskService.completedTasks());
  public filteredTasks: Task[] = [];
  public taskCompletedListOpen: boolean = false;
  public searchTerm: string = '';

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController,
    private alertCrtl: AlertController
  ) {
    effect(() => {
      this.search();
    });
  }

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

  public async deleteAllCompletedTasks() {
    const alertref = await this.alertCrtl.create({
      header: 'Confirmar Deletação',
      message: 'Tem certeza que deseja DELETAR TODAS AS TAREFAS COMPLETAS?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Deletar',
          cssClass: 'btn-danger',
          handler: () => {
            this.taskService.deleteAllCompletedTasks();
          },
        },
      ]
    });

    alertref.present();
  }

  public search() {
    this.filteredTasks = [ ...this.tasks().filter((task) => task.name.toUpperCase().includes(this.searchTerm.toUpperCase())) ];
  }

  public toggleOpenCompletedTask() {
    this.taskCompletedListOpen = !this.taskCompletedListOpen;
  }
}
