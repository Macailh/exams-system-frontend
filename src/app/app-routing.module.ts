import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddExamComponent } from './pages/admin/add-exam/add-exam.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateExamComponent } from './pages/admin/update-exam/update-exam.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewExamQuestionComponent } from './pages/admin/view-exam-question/view-exam-question.component';
import { ViewExamsComponent } from './pages/admin/view-exams/view-exams.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { StudentGuard } from './services/student.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'exams',
        component: ViewExamsComponent
      },
      {
        path: 'add-exam',
        component: AddExamComponent
      },
      {
        path: 'exam/:id',
        component: UpdateExamComponent
      },
      {
        path: 'questions/:examId/:title',
        component: ViewExamQuestionComponent
      },
      {
        path: 'questions/:questionId',
        component: UpdateQuestionComponent
      },
      {
        path: 'add-question/:examId/:title',
        component: AddQuestionComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [StudentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
