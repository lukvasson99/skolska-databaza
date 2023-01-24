import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabasePageComponent } from './database-page/database-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginGuard } from './login.guard';
import { StudentFormComponent } from './student-form/student-form.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';

const routes: Routes = [
  {
    path: ' ',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'database',
    component: DatabasePageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'studentForm',
    component: StudentFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'teacherForm',
    component: TeacherFormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
