import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exam-question',
  templateUrl: './view-exam-question.component.html',
  styleUrls: ['./view-exam-question.component.css']
})
export class ViewExamQuestionComponent {
  id: any;
  title: any;
  questions: any = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['examId'];
    console.log(this.id)
    this.title = this.route.snapshot.params['title'];
    this.questionService.getQuestionsFromExam(this.id).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteQuestion(id: any) {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Estás seguro , quieres eliminar esta pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(id).subscribe(
          (data) => {
            this.snack.open('Pregunta eliminada', '', {
              duration: 3000
            })
            this.questions = this.questions.filter((question: any) => question.id != id);
          },
          (error) => {
            this.snack.open('Error al eliminar la pregunta', '', {
              duration: 3000
            })
            console.log(error);
          }
        )
      }
    })
  }
}
