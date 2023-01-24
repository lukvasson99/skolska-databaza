import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DatabaseService,
  StudentType,
  TeacherType,
} from '../services/database.service';

@Component({
  selector: 'app-database-page',
  templateUrl: './database-page.component.html',
  styleUrls: ['./database-page.component.css'],
})
export class DatabasePageComponent implements OnInit {
  myForm: FormGroup;
  studentsActivated: boolean = true;
  buttonTexts: string[] = ['Students', 'Teachers'];

  students: StudentType[];
  teachers: TeacherType[];

  studentHeaders = [
    'Id',
    'First Name',
    'Last Name',
    'Class',
    'Date Of Birth',
    'Age',
    'Division',
    'Gender',
    'Average',
    'Disabled',
    'Awards',
  ];

  studentKeys = [
    'id',
    'firstName',
    'lastName',
    'class',
    'dateOfBirth',
    'age',
    'division',
    'gender',
    'average',
    'disabled',
    'awards',
  ];
  teacherHeaders = ['id', 'First Name', 'Last Name', 'Class', 'Age', 'Salary'];
  teacherKeys = ['id', 'firstName', 'lastName', 'class', 'age', 'salary'];

  constructor(
    private service: DatabaseService,
    private router: Router,
    private form: FormBuilder
  ) {
    this.students = service.studentDatabase;
    this.teachers = service.teacherDatabase;
  }
  ngOnInit() {
    this.myForm = this.form.group({});
  }
  onDatabaseSwitchClick() {
    this.studentsActivated = !this.studentsActivated;
  }
  //studentFunctions
  addStudentClick(): void {
    this.router.navigate(['studentForm']);
  }
  studentEditClick(id: number, data: StudentType) {
    this.service.inStudentAddMode = false;
    this.service.editId = id;
    Object.keys(data).forEach((key) => {
      this.myForm.addControl(key, new FormControl(data[key]));
    });
    this.service.studentForm = this.myForm;
    this.myForm = this.form.group({});
    this.router.navigate(['studentForm']);
  }
  studentDeleteClick(id: number) {
    this.service.deleteStudent(Number(id));
  }
  //teacherFunctions
  addTeacherClick(): void {
    this.router.navigate(['teacherForm']);
  }
  teacherEditClick(id: number, data: TeacherType) {
    this.service.inTeacherAddMode = false;
    this.service.editId = id;
    Object.keys(data).forEach((key) => {
      this.myForm.addControl(key, new FormControl(data[key]));
    });
    this.service.teacherForm = this.myForm;
    this.myForm = this.form.group({});
    this.router.navigate(['teacherForm']);
  }
  teacherDeleteClick(id: number) {
    this.service.deleteTeacher(Number(id));
  }
}
