import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageConquistaService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async possuiConquista(codigo: string): Promise<boolean> {
    return await this._storage?.get(codigo)
  }

  async addConquista(codigo: string): Promise<void> {
    await this._storage?.set(codigo, true)
  }
}
