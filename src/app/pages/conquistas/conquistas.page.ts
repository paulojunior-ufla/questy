import { Component } from '@angular/core';
import { Tentativa } from '@app/app/models/tentativa';
import { StorageTentativasService } from '@app/app/services/storage-tentativas.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.page.html',
  styleUrls: ['./conquistas.page.scss'],
})
export class ConquistasPage {

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
