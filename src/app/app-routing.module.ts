import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/students",
    pathMatch: "full"
  },
  {
    path: "students",
    loadChildren: () =>
      import("./modules/students/students.module").then(
        m => m.StudentsModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
