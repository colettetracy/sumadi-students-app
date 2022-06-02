import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Student } from 'src/app/models/Students';
import { RequestService } from 'src/app/shared/services/request.service';
import { Utils } from 'src/app/shared/services/utils';
import Swal from 'sweetalert2';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class CreateStudentComponent implements OnInit {

  title: string = "Create";
  button: string = "Submit";
  formStudent: FormGroup;
  update: boolean = false;
  student: Student;
  utils: Utils = new Utils();

  constructor(private builder: FormBuilder, private route: ActivatedRoute, private request: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      if (res.action) {
        this.initForm()
        if (res.action == "update") {
          this.title = "Update";
          this.button = "Save";
          this.update = true;
          if (res.id) {
            this.utils.loading("Loading data...")
            this.request.getById("v1/student", res.id).subscribe(
              result => {
                Swal.close();
                this.student = result;
                this.formStudent.patchValue(result);
                this.patchDate(result.birthdate);
              },
              error => {
                Swal.close();
                this.utils.showMessage("Error", "An error has occured while getting the student.", "error")
              }
            )
          }
        }
      }
    })
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
  }

  patchDate(date: string) {
    let ngbDate: NgbDateStruct = {
      day: moment(date).date(),
      month: moment(date).month(),
      year: moment(date).year()
    };
    this.formStudent.patchValue({ birthdate: ngbDate });
  }

  onSubmit() {
    //let formdata = new FormData();
    let studentData = this.formStudent.value;
    studentData.birthdate = this.utils.dateFormatter2(studentData.birthdate);
    //formdata.append("student", this.formStudent.value);
    if (this.formStudent.invalid) {
      this.formStudent.markAllAsTouched();
    }
    else {
      this.utils.loading("Saving the data...")
      if (!this.update) {
        this.request.post("v1/student", studentData).subscribe(
          result => {
            Swal.close();
            this.utils.showMessage("Success!", "The student was recorded succesfully.", "success");
            this.router.navigate(["/students"]);
          },
          error => {
            Swal.close();
            this.utils.showMessage("Error!", "An error has occurred, please try again later...", "error");
          }
        )
      } else {
        this.request.put("v1/student",this.student.studentId, studentData).subscribe(
          result => {
            Swal.close();
            this.utils.showMessage("Success!", "The student was modified succesfully.", "success");
            this.router.navigate(["/students"]);
          },
          error => {
            Swal.close();
            this.utils.showMessage("Error!", "An error has occurred, please try again later...", "error");
          }
        )
      }

    }
  }

  cancel() {
    if (this.update) {
      this.router.navigate(["/students"]);
    }
    else {
      this.formStudent.reset();
      this.formStudent.markAsUntouched()
    }
  }

}
