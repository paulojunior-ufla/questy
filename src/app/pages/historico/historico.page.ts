import { Component } from '@angular/core';
import { Tentativa } from '@app/app/models/tentativa';
import { StorageTentativasService } from '@app/app/services/storage-tentativas.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {

  tentativas: Tentativa[] = []

  constructor(
    private readonly tentativasStorage: StorageTentativasService
  ) { }

  async ionViewDidEnter() {
    this.tentativas = await this.tentativasStorage.getTentativas();
  }

}
