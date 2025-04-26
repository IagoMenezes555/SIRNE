import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor (
    private storage: Storage,
  ) {
    this.initStorage();
  }

  private async initStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async save(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this._storage?.get(key);    
    return value !== null ? value as T : null;
  }

  public async remove(key: string) {
    await this._storage?.remove(key);
  }
}
