import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppRoutingModule } from './app-routing.module';
import { DatabasePageComponent } from './database-page/database-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentFormComponent } from './student-form/student-form.component';
import { LoginGuard } from './login.guard';
import { DatabaseService } from './services/database.service';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    LoginPageComponent,
    DatabasePageComponent,
    ErrorPageComponent,
    StudentFormComponent,
    TeacherFormComponent,
  ],
  providers: [DatabaseService, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
