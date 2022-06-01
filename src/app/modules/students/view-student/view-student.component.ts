import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Student } from 'src/app/models/Students';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  @Input() student: Student;

  formStudent: FormGroup;

  constructor(private builder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm()
    this.formStudent.patchValue(this.student);
    this.patchDate(this.student.birthdate);
  }

  initForm() {
    this.formStudent = this.builder.group({
      firstName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      birthdate: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required, Validators.maxLength(500), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      gender: [null, [Validators.required]]
    })
    this.formStudent.disable();
  }

  patchDate(date: string) {
    let ngbDate: NgbDateStruct = { 
      day: moment(date).date(), 
      month: moment(date).month(), 
      year: moment(date).year() 
    };
    this.formStudent.patchValue({ birthdate: ngbDate });
  }

}
