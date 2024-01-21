import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export enum ToastMessageType {
  ERROR = "danger",
  SUCCESS = "secondary"
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showMessage(msg: string, msgType: ToastMessageType) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000,
      color: msgType
    });
    toast.present();
  }
}
