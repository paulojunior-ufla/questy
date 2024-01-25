import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tentativa } from '../models/tentativa';
import { Conquista } from '../models/conquista';

const STORAGE_KEY = "TENTATIVAS"
const AVISO_KEY = "AVISO"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getTentativas(): Promise<Tentativa[]> {
    const tentativas = await this._storage?.get(STORAGE_KEY)
    return tentativas || []
  }

  async getTentativa(idQuiz: number): Promise<Tentativa | null> {
    const tentativas = await this.getTentativas()
    return tentativas.find(item => item.idQuiz == idQuiz) || null
  }

  async updateTentativa(t: Tentativa): Promise<void> {
    let tentativas = await this.getTentativas();
    tentativas = tentativas.map(item => item.idQuiz == t.idQuiz ? t : item);
    await this._storage?.set(STORAGE_KEY, tentativas);
  }

  async addTentativa(t: Tentativa): Promise<void> {
    const tentativas = await this.getTentativas();
    tentativas.push(t);
    await this._storage?.set(STORAGE_KEY, tentativas);
  }

  async possuiConquista(c: Conquista): Promise<boolean> {
    const result = await this._storage?.get(c.codigo)
    return result
  }

  async addConquista(c: Conquista): Promise<void> {
    await this._storage?.set(c.codigo, true)
  }

  async leuAviso(): Promise<boolean> {
    const result = await this._storage?.get(AVISO_KEY)
    return result
  }

  async marcarAvisoComoLido(): Promise<void> {
    await this._storage?.set(AVISO_KEY, true)
  }
}
