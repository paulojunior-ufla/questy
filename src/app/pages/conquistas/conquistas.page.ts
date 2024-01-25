import { Component } from '@angular/core';
import { AcertouTodasQuestoes, AcertouTodasQuestoesAlgumasVezes, AcertouTodasQuestoesDePrimeira, AcertouTodasQuestoesVariasVezes, Conquista, PrimeiroQuizConcluido, RealizouMaisJogadas, RespondeuMuitasQuestoes, RespondeuVariasQuestoes } from '@app/app/models/conquista';
import { StorageService } from '@app/app/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.page.html',
  styleUrls: ['./conquistas.page.scss'],
})
export class ConquistasPage {

  conquistas: Conquista[] = [
    new PrimeiroQuizConcluido(),
    new RealizouMaisJogadas(),
    new AcertouTodasQuestoes(),
    new AcertouTodasQuestoesDePrimeira(),
    new RespondeuVariasQuestoes(),
    new RespondeuMuitasQuestoes(),
    new AcertouTodasQuestoesAlgumasVezes(),
    new AcertouTodasQuestoesVariasVezes()
  ]

  constructor(
    private readonly storage: StorageService,
    private readonly alertCtrl: AlertController
  ) { }

  async ionViewDidEnter() {
    await this.carregaMinhasConquistas()
  }

  async carregaMinhasConquistas() {
    const tentativas = await this.storage.getTentativas()
    for (let i = 0; i < this.conquistas.length; i++) {
      let c = this.conquistas[i]
      if (await this.storage.possuiConquista(c)) {
        c.conquistou()
        continue
      }

      if (c.ehValida(tentativas)) {
        c.conquistou()
        await this.storage.addConquista(c)
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