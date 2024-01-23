import { Component } from '@angular/core';
import { AcertouTodasQuestoes, Conquista, MuitasQuestoes, PrimeiroQuizConcluido } from '@app/app/models/conquista';
import { Tentativa } from '@app/app/models/tentativa';
import { StorageConquistaService } from '@app/app/services/storage-conquista.service';
import { StorageTentativasService } from '@app/app/services/storage-tentativas.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.page.html',
  styleUrls: ['./conquistas.page.scss'],
})
export class ConquistasPage {

  conquistas: Conquista[] = [
    new PrimeiroQuizConcluido(),
    new AcertouTodasQuestoes(),
    new MuitasQuestoes()
  ]

  constructor(
    private readonly conquistaStorage: StorageConquistaService,
    private readonly tentativasStorage: StorageTentativasService,
    private readonly alertCtrl: AlertController
  ) { }

  async ionViewDidEnter() {
    await this.carregaMinhasConquistas()
  }

  async carregaMinhasConquistas() {
    const tentativas = await this.tentativasStorage.getTentativas()
    for (let i = 0; i < this.conquistas.length; i++) {
      let c = this.conquistas[i]
      if (await this.conquistaStorage.possuiConquista(c.codigo)) {
        c.conquistou()
        continue
      }

      if (c.ehValida(tentativas)) {
        this.conquistaStorage.addConquista(c.codigo)
        const alert = await this.alertCtrl.create({
          header: 'Parabéns',
          message: `Você alcançou uma nova conquista: ${c.nome}`,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });

        await alert.present();
      }
    }
  }
}