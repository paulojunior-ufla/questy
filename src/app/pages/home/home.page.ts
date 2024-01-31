import { Component } from '@angular/core';
import { BadgesService } from '@app/app/services/badges.service';
import { QuizService } from '@app/app/services/quiz.service';
import { StorageService } from '@app/app/services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  novosQuizzes$ = new Observable<number>()

  constructor(
    private readonly badgesService: BadgesService
  ) {}

  async ionViewDidEnter() {
    this.novosQuizzes$ = this.badgesService.novosQuizzes
  }

}
