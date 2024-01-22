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

  public getQuizzes(): Promise<ResumoQuiz[]> {
    const result$ = this.http.get<ResumoQuiz[]>(`${BASE_URL}/quizzes.json`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    return firstValueFrom(result$);
  }

  public getQuizz(id: number): Promise<Quiz> {
    return firstValueFrom(this.http.get<Quiz>(`${BASE_URL}/${id}.json`));
  }
}
