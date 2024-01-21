import { Component } from '@angular/core';
import { ResumoQuiz } from '@app/app/models/quiz';
import { Tentativa } from '@app/app/models/tentativa';
import { QuizService } from '@app/app/services/quiz.service';
import { StorageTentativasService } from '@app/app/services/storage-tentativas.service';
import { ToastMessageType, ToastService } from '@app/app/services/toast.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { TentativasComponent } from '../components/tentativas/tentativas.component';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.page.html',
  styleUrls: ['./quizzes.page.scss'],
})
export class QuizzesPage {

  quizzes: ResumoQuiz[] = []
  tentativas: Tentativa[] = []
  isLoading = false

  constructor(
    private readonly quizService: QuizService,
    private readonly tentativasStorage: StorageTentativasService,
    private readonly loadingCtrl: LoadingController,
    private readonly modalCtrl: ModalController,
    private readonly toastService: ToastService,
  ) { }



  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    try {
      await loading.present();
      this.quizzes = await this.quizService.getQuizzes();
      this.tentativas = await this.tentativasStorage.getTentativas();
    } catch (error) {
      this.toastService.showMessage("Ops... algo deu errado! Tente novamente mais tarde",
        ToastMessageType.ERROR)
    } finally {
      loading.dismiss();
    }
  }

  jaTentou(q: ResumoQuiz) {
    if (!this.tentativas) return false;
    return this.tentativas.find(item => item.idQuiz == q.id) ? true : false;
  }

  async onVerTentativas() {
    const modal = await this.modalCtrl.create({
      component: TentativasComponent,
      backdropDismiss: false
    });

    return await modal.present();
  }

}
