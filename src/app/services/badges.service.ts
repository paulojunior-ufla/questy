import { Injectable } from '@angular/core';
import { QuizService } from './quiz.service';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  private _novosQuizzes = new BehaviorSubject<number>(0);
  private _quantidadeQuizzes = 0
  private _quantidadeTentativas = 0

  constructor(
    private readonly quizService: QuizService,
    private readonly storage: StorageService,
  ) { 
    this.atualizarNovosQuizzes()
  }

  async atualizarNovosQuizzes() {
    this._quantidadeQuizzes = await this.quizService.getQuantidadeQuizzes()
    this._quantidadeTentativas = await this.storage.getQuantidadeTentativas()
    this._novosQuizzes.next(this._quantidadeQuizzes - this._quantidadeTentativas)
  }

  get novosQuizzes(): Observable<number> {
    return this._novosQuizzes.asObservable()
  }




}
