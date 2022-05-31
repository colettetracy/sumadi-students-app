import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';

const routes: Routes = [
  {
    path: '',
    component: ListStudentsComponent
  },
  {
    path: ':action',
    component: CreateStudentComponent
  },
  {
    path: ':action/:id',
    component: CreateStudentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
