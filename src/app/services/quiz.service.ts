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
    return firstValueFrom(this.http.get<ResumoQuiz[]>(`${BASE_URL}/quizzes.json`));
  }

  public getQuizz(id: number): Promise<Quiz> {
    return firstValueFrom(this.http.get<Quiz>(`${BASE_URL}/${id}.json`));
  }
}
