import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamService {


  constructor(private http: HttpClient) { }

  public listExams() {
    return this.http.get(`${baseUrl}/exams`);
  }

  public addExam(exam: any) {
    return this.http.post(`${baseUrl}/exams/`, exam);
  }

  public deleteExam(id: any) {
    return this.http.delete(`${baseUrl}/exams/${id}`);
  }

  public getExam(id: any) {
    return this.http.get(`${baseUrl}/exams/${id}`);
  }

  public updateExam(exam: any) {
    return this.http.put(`${baseUrl}/exams/`, exam);
  }

  public listExamsFromCategory(id: any) {
    return this.http.get(`${baseUrl}/exams/category/${id}`);
  }

  public getActiveExams() {
    return this.http.get(`${baseUrl}/exams/active`);
  }

  public getActiveExamsFromCategory(id: any) {
    return this.http.get(`${baseUrl}/exams/category/active/${id}`);
  }
}
