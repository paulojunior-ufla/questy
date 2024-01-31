import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz, ResumoQuiz } from '../models/quiz';
import { firstValueFrom } from 'rxjs';

const BASE_URL = 'assets/quizzes'

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizzes(): Promise<ResumoQuiz[]> {
    const result$ = this.http.get<ResumoQuiz[]>(`${BASE_URL}/quizzes.json`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    return firstValueFrom(result$);
  }

  async getQuizzesPorCategoria(cat: string): Promise<ResumoQuiz[]> {
    let quizzes = await this.getQuizzes()
    return quizzes.filter(item => item.categoria == cat)
  }

  getQuizz(id: number): Promise<Quiz> {
    return firstValueFrom(this.http.get<Quiz>(`${BASE_URL}/${id}.json`));
  }

  async getQuantidadeQuizzes(): Promise<number> {
    const quizzes = await this.getQuizzes()
    return quizzes.length
  }
}
