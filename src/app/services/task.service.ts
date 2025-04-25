import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private allTasks = signal<Task[]>([]);
  public tasks = signal<Task[]>([]);
  public completedTasks = signal<Task[]>([]);

  constructor(
    private storageService: StorageService,
  ) {
    this.loadTasks();
  }

  public loadTasks() {
    const tasksSaved = this.storageService.get('tasks') as Task[];

    if (tasksSaved) {
      this.allTasks.set(tasksSaved);
      this.loadCompletedTasks();
      this.loadIncompleteTasks();
    }
  }

  private loadCompletedTasks() {
    this.completedTasks.set(this.allTasks().filter((task) => task.check));
  }

  private loadIncompleteTasks() {
    this.tasks.set(this.allTasks().filter((task) => !task.check))
  }

  public addTask(task: Task) {  
    task.id = this.makeID();

    this.allTasks.update((tasks) => [ task, ...tasks ]);
    this.saveTasks();
  }

  public removeTask(taskId: string) {
    this.allTasks.update((tasks) => {
      return tasks.filter((task) => task.id !== taskId)
    });

    this.saveTasks();
  }

  public checkTask(taskId: string, status: boolean) {
    this.allTasks.update((tasks) => {
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
    this.storageService.save('tasks', this.allTasks());
    this.loadCompletedTasks();
    this.loadIncompleteTasks();
  }

  private makeID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
