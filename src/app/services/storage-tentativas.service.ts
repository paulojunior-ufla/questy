import { Injectable } from '@angular/core';
import { Tentativa } from '../models/tentativa';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageTentativasService {

  private readonly STORAGE_KEY: string = "TENTATIVAS";
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getTentativas(): Promise<Tentativa[]> {
    const tentativas = await this._storage?.get(this.STORAGE_KEY)
    return tentativas || []
  }

  async getTentativa(idQuiz: number): Promise<Tentativa | null> {
    const tentativas = await this.getTentativas()
    return tentativas.find(item => item.idQuiz == idQuiz) || null
  }

  async updateTentativa(t: Tentativa): Promise<void> {
    let tentativas = await this.getTentativas();
    tentativas = tentativas.map(item => item.idQuiz == t.idQuiz ? t : item);
    await this._storage?.set(this.STORAGE_KEY, tentativas);
  }

  async addTentativa(t: Tentativa): Promise<void> {
    const tentativas = await this.getTentativas();
    tentativas.push(t);
    await this._storage?.set(this.STORAGE_KEY, tentativas);
  }
}
