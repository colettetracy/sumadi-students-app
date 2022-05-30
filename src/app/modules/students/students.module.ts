import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';


@NgModule({
  declarations: [
    CreateStudentComponent,
    ListStudentsComponent,
    ViewStudentComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
