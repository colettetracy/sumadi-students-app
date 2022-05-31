import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDatepickerModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateStudentComponent,
    ListStudentsComponent,
    ViewStudentComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  entryComponents:[
    ViewStudentComponent
  ]
})
export class StudentsModule { }
