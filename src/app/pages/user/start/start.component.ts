import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  examId: any;
  questions: any;
  pointsAchieved = 0;
  correctAnswers = 0;
  attemps = 0;

  isSend = false;
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.preventTheBackButton();
    this.examId = this.route.snapshot.params['examId'];
    console.log(this.examId);
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestionFromExamForTest(this.examId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((p: any) => {
          p['givenAnswer'] = '';
        })
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas de la prueba', 'error');
      }
    )
  }


  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateExam();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  preventTheBackButton() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    })
  }

  sendExam() {
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluateExam();
      }
    })
  }

  evaluateExam() {
    this.questionService.evaluateExam(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.pointsAchieved = data.maxPoints;
        this.correctAnswers = data.correctAnswers;
        this.attemps = data.attemps;
        this.isSend = true;
      },
      (error) => {
        console.log(error);
      }
    )
    /*this.esEnviado = true;
    this.preguntas.forEach((p:any) => {
      if(p.respuestaDada == p.respuesta){
        this.respuestasCorrectas ++;
        let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
        this.puntosConseguidos += puntos;
      }
      if(p.respuestaDada.trim() != ''){
        this.intentos ++;
      }
    });
    console.log("Respuestas correctas : " + this.respuestasCorrectas);
    console.log("Puntos conseguidos : " + this.puntosConseguidos);
    console.log("Intentos : " + this.intentos);
    console.log(this.preguntas);*/
  }

  getFormatTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} seg`;
  }

  printPage() {
    window.print();
  }
}
