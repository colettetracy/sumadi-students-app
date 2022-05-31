import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/models/Students';
import { RequestService } from 'src/app/shared/services/request.service';
import { Utils } from 'src/app/shared/services/utils';

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

  formStudent: FormGroup;
  update:boolean = false;
  student:Student;
  utils:Utils=new Utils();

  constructor(private builder: FormBuilder, private route: ActivatedRoute, private request:RequestService) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      if (res.action) {
        this.initForm()
        if (res.id) {
          this.request.getById("",res.id).subscribe(
            result=>{
              this.formStudent.patchValue(result);
            },
            error=>{
              this.utils.showMessage("Error", "An error has occured while getting the student.", "error")
            }
          )
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

  onSubmit() {
    if (this.formStudent.invalid) {
      this.formStudent.markAllAsTouched();
    }
    console.log("submit")
  }

}
