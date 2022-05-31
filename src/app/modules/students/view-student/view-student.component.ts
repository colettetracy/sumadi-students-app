import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/models/Students';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  @Input() student: Student; 

  formStudent:FormGroup;

  constructor(private builder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm()
    this.formStudent.patchValue(this.student);
  }

  initForm() {
    this.formStudent = this.builder.group({
      firstName:[null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName:[null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      birthdate:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      address:[null, [Validators.required, Validators.maxLength(500), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      gender:[null, [Validators.required]]
    })
    this.formStudent.disable();
  }

}
