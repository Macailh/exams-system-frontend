import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestionsFromExam(id: any) {
    return this.http.get(`${baseUrl}/questions/exam/all/${id}`);
  }

  public saveQuestion(question: any) {
    return this.http.post(`${baseUrl}/questions/`, question);
  }

  public deleteQuestion(id: any) {
    return this.http.delete(`${baseUrl}/questions/${id}`);
  }

  public updateQuestion(question: any) {
    return this.http.put(`${baseUrl}/questions/`, question);
  }

  public getQuestion(id: any) {
    return this.http.get(`${baseUrl}/questions/${id}`);
  }

  public getQuestionFromExamForTest(id: any) {
    return this.http.get(`${baseUrl}/questions/exam/${id}`);
  }

  public evaluateExam(questions: any) {
    return this.http.post(`${baseUrl}/questions/evaluate-exam`, questions);
  }
}