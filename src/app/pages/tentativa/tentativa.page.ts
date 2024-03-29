import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@app/app/models/quiz';
import { QuizService } from '@app/app/services/quiz.service';
import { ToastMessageType, ToastService } from '@app/app/services/toast.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { JogadaComponent } from '../components/jogada/jogada.component';
import { formatNumber } from '@angular/common';
import { NativeAudio } from '@capacitor-community/native-audio';
import { StorageService } from '@app/app/services/storage.service';
import { BadgesService } from '@app/app/services/badges.service';

@Component({
  selector: 'app-tentativa',
  templateUrl: './tentativa.page.html',
  styleUrls: ['./tentativa.page.scss'],
})
export class TentativaPage implements OnInit {

  quizz!: Quiz;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private readonly loadingCtrl: LoadingController,
    private readonly modalCtrl: ModalController,
    private readonly quizService: QuizService,
    private readonly storage: StorageService,
    private readonly actRoute: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly alertCtrl: AlertController,
    private readonly badgeService: BadgesService

  ) { }

  async ngOnInit() {
    await NativeAudio.preload({ assetId: 'finished', assetPath: 'assets/sounds/finished.mp3' });
  }


  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });

    try {
      await loading.present();
      this.quizz = await this.quizService.getQuizz(
        Number.parseInt(this.actRoute.snapshot.paramMap.get("id") || "0")
      );
    } catch (error) {
      this.toastService.showMessage("Ops... algo deu errado! Tente novamente mais tarde",
        ToastMessageType.ERROR)
    } finally {
      loading.dismiss()
    }
  }

  async onIniciar() {
    const modal = await this.modalCtrl.create({
      component: JogadaComponent,
      backdropDismiss: false,
      componentProps: {
        'questoes': this.quizz?.questoes
      }
    });

    modal.onWillDismiss().then((value: any) => {
      if (value.data.contarTentativa) {
        this.terminouQuizz(value.data.numAcertos);
      }
    });

    return await modal.present();
  }

  async salvarTentativa(numAcertos: number) {
    let tentativa = await this.storage.getTentativa(this.quizz.id);
    if (!tentativa) {
      tentativa = {
        idQuiz: this.quizz.id,
        titulo: this.quizz.titulo,
        imgCapa: this.quizz.imgCapa,
        numQuestoes: this.quizz.numQuestoes,
        numAcertos: numAcertos,
        numJogadas: 1
      };
      await this.storage.addTentativa(tentativa);
    } else {
      tentativa.numJogadas += 1;
      tentativa.imgCapa = this.quizz.imgCapa;
      tentativa.numAcertos = tentativa.numAcertos < numAcertos ? numAcertos : tentativa.numAcertos
      await this.storage.updateTentativa(tentativa);
    }

    await this.badgeService.atualizarNovosQuizzes()

  }

  async terminouQuizz(numAcertos: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });

    try {
      await loading.present();
      await this.salvarTentativa(numAcertos)
      const rendimento = formatNumber((numAcertos / this.quizz.numQuestoes) * 100, this.locale, '1.0-0');

      NativeAudio.play({
        assetId: 'finished'
      })

      const alert = await this.alertCtrl.create({
        header: 'Resultado',
        message: `Você completou este quiz e acertou ${numAcertos} de ${this.quizz.numQuestoes} questões. Seu desempenho foi de ${rendimento}%.`,
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });

      await alert.present();
    } catch (error) {
      this.toastService.showMessage("Ops... algo deu errado! Tente novamente mais tarde",
        ToastMessageType.ERROR)
    } finally {
      loading.dismiss();
    }
  }



}
