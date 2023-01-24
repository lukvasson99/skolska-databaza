import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css'],
})
export class TeacherFormComponent implements OnInit {
  editId: number = null;
  teacherForm: FormGroup;

  constructor(
    private database: DatabaseService,
    private form: FormBuilder,
    private router: Router,
    public service: DatabaseService
  ) {
    this.teacherForm = this.form.group({
      id: ' ',
      firstName: '',
      lastName: '',
      class: '',
      age: '',
      salary: '',
    });
  }

  ngOnInit() {
    this.database.inTeacherAddMode.subscribe((value) => {
      if (value === false) {
        this.onAddModeOff();
      }
    });
  }
  onSubmit(): void {
    if (this.teacherForm.valid) {
      if (this.service.inTeacherAddMode) {
        this.database.addTeacher(this.teacherForm.value);
        this.teacherForm.reset();
        window.alert('Added Teacher');
        this.router.navigate(['database']);
      }
      //teacher edit form
      else if (!this.service.inTeacherAddMode) {
        this.database.editTeacher(this.editId, this.teacherForm.value);
        this.teacherForm.reset();
        window.alert('Edited Teacher ' + this.editId);
        this.editId = null;
        this.router.navigate(['database']);
      }
    }
  }
  onAddModeOff() {
    this.teacherForm = this.database.teacherForm;
  }
  closeForm(): void {
    this.router.navigate(['database']);
    this.service.inTeacherAddMode = true;
  }
}
