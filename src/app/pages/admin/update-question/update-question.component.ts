import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  questionId: any
  question: any
  exam: any

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params['questionId'];
    console.log(this.questionId)
    this.questionService.getQuestion(this.questionId).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public updateQuestionData() {
    this.questionService.updateQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Pregunta actualizada', 'La pregunta ha sido actualizada con éxito', 'success').then((e) => {
          this.router.navigate(['/admin/questions/' + this.question.exam.id + '/' + this.question.exam.title]);
        })
      }
    )
  }
}
