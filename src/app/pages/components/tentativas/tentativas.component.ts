import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { StorageTentativasService } from '@app/app/services/storage-tentativas.service';
import { Tentativa } from '@app/app/models/tentativa';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.scss'],
})
export class TentativasComponent {

  tentativas: Tentativa[] = []

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly tentativasStorage: StorageTentativasService
  ) { }

  async ionViewDidEnter() {
    this.tentativas = await this.tentativasStorage.getTentativas();
  }

  public onClose() {
    this.modalCtrl.dismiss();
  }
}
