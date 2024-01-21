import { Component, Input, OnInit } from '@angular/core';
import { Questao } from '@app/app/models/questao';
import { ToastMessageType, ToastService } from '@app/app/services/toast.service';
import { NativeAudio } from '@capacitor-community/native-audio';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-jogada',
  templateUrl: './jogada.component.html',
  styleUrls: ['./jogada.component.scss'],
})
export class JogadaComponent implements OnInit {

  readonly delay;
  indiceAtual: number;
  numAcertos: number;

  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;

  mensagensSucesso: string[] = [
    "Certo!",
    "Excelente!",
    "Bom trabalho!",
    "Muito bem!",
    "Fez bonito!",
    "Ótimo trabalho!",
    "É isso aí!",
    "Boa!"
  ];

  @Input() questoes: Questao[] = [];

  constructor(
    private readonly modalCtrl: ModalController,
    private toastService: ToastService,
    private alertCtrl: AlertController
  ) {
    this.indiceAtual = 0;
    this.numAcertos = 0;
    this.delay = 1000;

    this.a = true;
    this.b = true;
    this.c = true;
    this.d = true;
  }

  async ngOnInit() {
    await NativeAudio.preload({assetId: 'success', assetPath: 'assets/sounds/success.mp3'});
    await NativeAudio.preload({assetId: 'error', assetPath: 'assets/sounds/error.mp3'});
  }

  public get progresso(): number {
    return ((this.indiceAtual + 1) / this.questoes.length);
  }

  public getNumeroAleatorio(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public responder(value: string) {
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;

    if (value === this.questaoAtual.resposta) {
      this.numAcertos++;
      NativeAudio.play({
        assetId: 'success'
      })
      this.toastService.showMessage(this.mensagensSucesso[this.getNumeroAleatorio(0, this.mensagensSucesso.length)], ToastMessageType.SUCCESS);
    } else {
      NativeAudio.play({
        assetId: 'error'
      })
      this.toastService.showMessage("Ops, não foi dessa vez!", ToastMessageType.ERROR);
    }
    if (this.indiceAtual < this.questoes.length - 1) {
      this.proximaQuestao();
    } else {
      this.acabou();
    }
  }

  private acabou() {
    setTimeout(() => {
      this.modalCtrl.dismiss(
        {
          'contarTentativa': true,
          'numAcertos': this.numAcertos
        }
      );
    }, this.delay);
  }

  private proximaQuestao() {
    setTimeout(() => {
      this.indiceAtual++;
      this.a = true;
      this.b = true;
      this.c = true;
      this.d = true;
    }, this.delay);
  }

  public get questaoAtual() {
    return this.questoes[this.indiceAtual];
  }

  async onClose() {
    if (this.indiceAtual == 0) {
      this.modalCtrl.dismiss(
        {
          'contarTentativa': false,
          'numAcertos': 0
        }
      );
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Atenção!',
        message: 'Deseja sair sem terminar este quiz?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'alert-button-cancel'
          }, {
            text: 'Sim',
            handler: () => {
              this.modalCtrl.dismiss(
                {
                  'contarTentativa': true,
                  'numAcertos': this.numAcertos
                }
              );
            }
          }
        ]
      });

      await alert.present();
    }
  }

}
