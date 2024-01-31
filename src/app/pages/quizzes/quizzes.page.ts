import { Component } from '@angular/core';
import { ResumoQuiz } from '@app/app/models/quiz';
import { Tentativa } from '@app/app/models/tentativa';
import { QuizService } from '@app/app/services/quiz.service';
import { StorageService } from '@app/app/services/storage.service';
import { ToastMessageType, ToastService } from '@app/app/services/toast.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.page.html',
  styleUrls: ['./quizzes.page.scss'],
})
export class QuizzesPage {

  quizzes: ResumoQuiz[] = []
  tentativas: Tentativa[] = []
  avisoLido: boolean = false
  opcaoEscolhida = ""

  constructor(
    private readonly quizService: QuizService,
    private readonly storage: StorageService,
    private readonly loadingCtrl: LoadingController,
    private readonly toastService: ToastService,
  ) { }

  async ionViewDidEnter() {
    this.opcaoEscolhida = "Todos"

    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    try {
      await loading.present();
      this.avisoLido = await this.storage.leuAviso();
      this.quizzes = await this.quizService.getQuizzes();
      this.tentativas = await this.storage.getTentativas();
    } catch (error) {
      this.toastService.showMessage("Ops... algo deu errado! Tente novamente mais tarde",
        ToastMessageType.ERROR)
    } finally {
      loading.dismiss();
    }
  }

  async semFiltro() {
    this.opcaoEscolhida = "Todos"
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    try {
      await loading.present();
      this.quizzes = await this.quizService.getQuizzes();
    } catch (error) {
      this.toastService.showMessage("Ops... algo deu errado! Tente novamente mais tarde",
        ToastMessageType.ERROR)
    } finally {
      loading.dismiss();
    }
  }

  async porCategoria(cat: string) {
    this.opcaoEscolhida = cat
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...'
    });
    try {
      await loading.present();
      this.quizzes = await this.quizService.getQuizzesPorCategoria(cat);
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

  async onEntendido() {
    await this.storage.marcarAvisoComoLido()
    this.avisoLido = true
  }
}
