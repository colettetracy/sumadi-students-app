import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { PagedRequest, SortOrder } from 'src/app/models/paged-request';
import { Student } from 'src/app/models/Students';
import { RequestService } from 'src/app/shared/services/request.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from "rxjs/operators";
import { ViewStudentComponent } from '../view-student/view-student.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/services/utils';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  students: Student[] = [
    {
      studentId:"1",
      firstName: "tango",
      lastName: "Mango",
      address: "my address",
      birthdate:"1996/09/05",
      email: "myemail@test.com",
      gender:"F"
    }
  ];
  studentModel: Student;
  pageSizes = [10, 25, 50, 100];
  searchTerm: string = "";
  Paging: PagedRequest = { PageNumber: 1, PageSize: this.pageSizes[0], SortBy: "FechaCreacion", SortOrder: SortOrder.Descending };
  totalCount = 0;

  utils: Utils = new Utils();

  constructor(private service: RequestService, private modalService: NgbModal, private router:Router) { }

  ngOnInit(): void {
    this.getStudents("");
    this.totalCount = this.students.length;
  }

  getStudents(term: string) {
    this.utils.loading("Loading table...")
    this.service.getQueryResult("get", term).subscribe(r => {
      Swal.close();
      this.students = r.data?.students;
      this.totalCount = this.students.length;
      
    },
      error => {
        Swal.close();
        this.utils.showMessage("Error", "An error has occured while getting the data", "error");
        
      });
  }

  onEdit(student: Student) {
    this.router.navigate(["students/update", student.studentId])
  }

  onDelete(student: Student) {
    Swal.fire({
      title: 'Do you want to delete the student?',
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        this.utils.loading("Deleting the student...");
        this.service.put("delete", student.studentId,null).subscribe(
          result => {
            Swal.close();
            this.utils.showMessage("Success!", "The student was deleted succesfully.", "success");
            this.getStudents("");
          },
          error => {
            Swal.close();
            this.utils.showMessage("Error!", "An error has occurred, please try again later...", "error");
          }
        )
      }
    })
  }

  onView(student: Student) {
    const modalRef = this.modalService.open(ViewStudentComponent, {
      centered:true
    });
    modalRef.componentInstance.student = student;
  }

  searchStudent: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        return this.service.getQueryResult("get", term).pipe(
          map(r => {
            this.students = r.data?.students;
            this.totalCount = this.students.length;
            return [];
          }),
          catchError(() => {
            this.utils.showMessage("Error", "An error has occured while getting the data", "error");
            return [];
          }))
      })
    );
  formatter = (x: any) => `${x.firstName} ${x.lastName}`;

  onPageSizeChange() {
    this.Paging.PageNumber = 1;
    this.getStudents(this.searchTerm);
  }

  onPage(pageNumber: any) {
    this.Paging.PageNumber = pageNumber;
    this.getStudents(this.searchTerm);
  }

}
