import { Component } from '@angular/core';
import { Tentativa } from '@app/app/models/tentativa';
import { StorageService } from '@app/app/services/storage.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {

  tentativas: Tentativa[] = []

  constructor(
    private readonly storage: StorageService
  ) { }

  async ionViewDidEnter() {
    this.tentativas = await this.storage.getTentativas();
  }

}
