import { Injectable, signal } from '@angular/core';
import { Meal, Menu, MenuDatabase } from '../models/menu';
import { ToastController } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import Backendless from 'backendless';
import { Auth } from '../models/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu = signal<Menu[]>([]);
  public lunches = signal<Meal[]>([]);
  public snacks = signal<Meal[]>([]);
  public loadMenu = signal<boolean>(false);
  public loadDatabase = signal<boolean>(false);
  public errorReq = signal<boolean>(false);

  private NAME_SERVE_MENU = 'menu';
  private NAME_SERVE_MENU_DATABASE = 'menu-database';
  
  constructor(
    private storageService: StorageService,
    private toastCtrl: ToastController
  ) {
    this.loadLocal();
    this.loadBackendless();
  }

  public async loadLocal() {
    const savedMenu = await this.storageService.get<Menu[]>('menu');
    const savedDatabase = await this.storageService.get<MenuDatabase[]>('database');

    if (savedDatabase !== null) {
      this.filterDatabase(savedDatabase);

      if (savedMenu !== null) {
        this.menu.set(savedMenu);
      }
    }
  }

  public loadBackendless() {
    const authSaved = localStorage.getItem('auth');    

    if (authSaved) {
      const authJSON = JSON.parse(authSaved) as Auth;
      
      const APP_ID = authJSON.appid;
      const API_KEY = authJSON.appkey;

      Backendless.initApp(APP_ID, API_KEY);

      this.getServeMenuDatabase();
      // this.getServeMenu();
    }
  }

  public validateConnection() {
    return Backendless.Data.of(this.NAME_SERVE_MENU).find();
  }

  private getServeMenu() {    
    this.loadMenu.set(true);
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU).find().then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {
        const menu = res as Menu[];

        if (this.errorReq) {
          this.errorReq.set(false);
        }

        this.menu.set(this.organizeDays(menu));
        this.saveMenu();
      },
      error: () => {
        this.loadMenu.set(false)
        this.errorReq.set(true);
      },
      complete: () => this.loadMenu.set(false),
    });
  }

  private getServeMenuDatabase() {
    this.loadDatabase.set(true);
    new Observable(observer => {
      Backendless.Data.of(this.NAME_SERVE_MENU_DATABASE).find().then(result => {
        observer.next(result);
        observer.complete();
      }).catch(err => observer.error(err));
    }).subscribe({
      next: (res) => {
        const database = res as MenuDatabase[];

        this.saveDatabase(database);
        this.getServeMenu();
        this.filterDatabase(database);
      },
      error: () => {
        this.presentToast('Erro ao carregar cardápio :/', 'danger');
        this.errorReq.set(true);
        this.loadDatabase.set(false);
      },
      complete: () => this.loadDatabase.set(false),
    });
  }

  private saveMenu() {
    this.storageService.save('menu', this.menu());
  }

  private saveDatabase(database: MenuDatabase[]) {
    this.storageService.save('database', database);
  }

  private filterDatabase(database: MenuDatabase[]) {
    let snacks: Meal[] = [];
    let lunches: Meal[] = [];
    
    database.forEach((data) => {
      data.type === 'snack' ? snacks.push({ calories: data.calories, carbohydrates: data.carbohydrates, glucose: data.glucose, id: data.id, objectId: data.objectId, lactose: data.lactose, name: data.name, assessment: 0 }) : lunches.push({ calories: data.calories, carbohydrates: data.carbohydrates, glucose: data.glucose, id: data.id, objectId: data.objectId, lactose: data.lactose, name: data.name, assessment: 0 });
    });

    if (this.errorReq) {
      this.errorReq.set(false);
    }

    this.snacks.set(snacks);
    this.lunches.set(lunches);
  }

  private organizeDays(menu: Menu[]): Menu[] {
    const daysOrder = ["segunda", "terça", "quarta", "quinta", "sexta"];

    return menu.sort((a, b) => {
      const dayAIndex = daysOrder.indexOf(a.day.toLowerCase());
      const dayBIndex = daysOrder.indexOf(b.day.toLowerCase());
      return dayAIndex - dayBIndex;
    });
  }

  public getMealId(id: string): Meal | undefined {    
    return this.snacks().find((s) => s.id === id) || this.lunches().find((l) => l.id === id);
  }

  private async presentToast(text: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'bottom',
      color: color,
      buttons: [{ text: 'Fechar', role: 'cancel' }],
    });
  
    await toast.present();
  }
}
