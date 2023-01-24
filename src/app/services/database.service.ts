import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DatabaseService {
  studentDatabase: StudentType[];
  teacherDatabase: TeacherType[];

  //variables for editing
  inStudentAddMode: any = true;
  inTeacherAddMode: any = true;

  studentForm: FormGroup;
  teacherForm: FormGroup;

  editId: number = null;
  constructor() {
    if (!localStorage.getItem('studentID')) {
      localStorage.setItem('studentID', '1');
    }
    if (!localStorage.getItem('teacherID')) {
      localStorage.setItem('teacherID', '1');
    }
    if (localStorage.getItem('studentDatabase')) {
      this.studentDatabase =
        JSON.parse(localStorage.getItem('studentDatabase')) || [];
    } else {
      this.studentDatabase = [];
    }
    if (localStorage.getItem('teacherDatabase')) {
      this.teacherDatabase =
        JSON.parse(localStorage.getItem('teacherDatabase')) || [];
    } else {
      this.teacherDatabase = [];
    }
  }

  //studentFunctions
  addStudent(data: StudentType): void {
    data.id = JSON.parse(localStorage.getItem('studentID'));
    localStorage.setItem(
      'studentID',
      JSON.stringify(parseInt(localStorage.getItem('studentID')) + 1)
    );
    this.studentDatabase.push(data);
    this.pushLocalStorage();
  }
  editStudent(id: number, data: StudentType) {
    this.studentDatabase.forEach((student, index) => {
      if (student.id === id) this.studentDatabase[index] = data;
      console.log(this.studentForm);
    });
    this.pushLocalStorage();
    this.editId = null;
    this.studentForm = null;
    this.inStudentAddMode = true;
  }
  deleteStudent(id: number) {
    this.studentDatabase.forEach((student, index) => {
      if (student.id === id) this.studentDatabase.splice(index, 1);
    });
    this.pushLocalStorage();
  }

  //teacherFunctions
  addTeacher(data: TeacherType): void {
    data.id = JSON.parse(localStorage.getItem('teacherID'));
    localStorage.setItem(
      'teacherID',
      JSON.stringify(parseInt(localStorage.getItem('teacherID')) + 1)
    );
    this.teacherDatabase.push(data);
    this.pushLocalStorage();
  }
  editTeacher(id: number, data: TeacherType) {
    this.teacherDatabase.forEach((teacher, index) => {
      if (teacher.id === id) this.teacherDatabase[index] = data;
    });
    this.pushLocalStorage();
    this.editId = null;
    this.teacherForm = null;
    this.inTeacherAddMode = true;
  }
  deleteTeacher(id: number) {
    this.teacherDatabase.forEach((teacher, index) => {
      if (teacher.id === id) this.teacherDatabase.splice(index, 1);
    });
    this.pushLocalStorage();
  }
  pushLocalStorage(): void {
    localStorage.setItem(
      'studentDatabase',
      JSON.stringify(this.studentDatabase)
    );
    localStorage.setItem(
      'teacherDatabase',
      JSON.stringify(this.teacherDatabase)
    );
  }
}
export type StudentType = {
  id: number;
  firstName: number;
  lastName: string;
  class: string;
  dateOfBirth: Date;
  age: number;
  division: string;
  gender: string;
  average: number;
  disabled: boolean;
  awards: string;
};
export type TeacherType = {
  id: number;
  firstName: string;
  lastName: string;
  class: string;
  age: number;
  salary: number;
};
