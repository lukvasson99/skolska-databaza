import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  editId: number = null;
  studentForm: FormGroup;

  constructor(
    private database: DatabaseService,
    private form: FormBuilder,
    private router: Router,
    public service: DatabaseService
  ) {
    this.studentForm = this.form.group({
      id: ' ',
      firstName: ' ',
      lastName: '',
      class: '',
      dateOfBirth: '',
      age: '',
      division: '',
      gender: '',
      average: '',
      disabled: '',
      awards: '',
    });
  }

  ngOnInit() {
    this.database.inStudentAddMode.subscribe((value) => {
      if (value === false) {
        this.onAddModeOff();
      }
    });
  }
  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.service.inStudentAddMode) {
        this.database.addStudent(this.studentForm.value);
        this.studentForm.reset();
        window.alert('Added Student');
        this.router.navigate(['database']);
      } else if (!this.service.inStudentAddMode) {
        this.database.editStudent(this.editId, this.studentForm.value);
        this.studentForm.reset();
        window.alert('Edited Student ' + this.editId);
        this.editId = null;
        this.router.navigate(['database']);
      }
    }
  }
  onAddModeOff() {
    this.studentForm = this.database.studentForm;
  }
  closeForm(): void {
    this.router.navigate(['database']);
    this.service.inStudentAddMode = true;
  }
}
