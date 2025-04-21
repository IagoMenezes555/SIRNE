import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks = signal<Task[]>([]);

  constructor(
    private storageService: StorageService,
  ) {
    this.loadTasks();
  }

  public loadTasks() {
    const tasksSaved = this.storageService.get('tasks');

    if (tasksSaved) {
      this.tasks.set(tasksSaved);
    }
  }

  public addTask(task: Task) {    
    task.id = this.makeID();

    this.tasks.update((tasks) => [ task, ...tasks ]);
    this.saveTasks();
  }

  public removeTask(taskId: string) {
    this.tasks.update((tasks) => {
      return tasks.filter((task) => task.id !== taskId)
    });

    this.saveTasks();
  }

  public checkTask(taskId: string, status: boolean) {
    this.tasks.update((tasks) => {
      tasks.forEach((task) => {
        if (task.id === taskId) {
          task.check = status;
        }
      });

      return tasks;
    });

    this.saveTasks();
  }

  private saveTasks() {
    this.storageService.save('tasks', this.tasks());
  }

  private makeID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
