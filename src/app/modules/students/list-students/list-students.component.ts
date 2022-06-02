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

  students: Student[] = [];
  studentModel: Student;
  pageSizes = [10, 25, 50, 100];
  searchTerm: string = "";
  Paging: PagedRequest = { PageNumber: 1, PageSize: this.pageSizes[0], SortBy: "FechaCreacion", SortOrder: SortOrder.Descending };
  totalCount = 0;

  utils: Utils = new Utils();

  constructor(private service: RequestService, private modalService: NgbModal, private router:Router) { }

  ngOnInit(): void {
    this.getStudents("");
  }

  getStudents(term: string) {
    this.utils.loading("Loading table...")
    this.service.getAll("v1/student").subscribe(r => {
      Swal.close();
      this.students = r;
      this.totalCount = this.students.length;
    },
      error => {
        Swal.close();
        this.utils.showMessage("Error", error.error.message, "error");
        
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
        this.service.put("v1/student", student.studentId,null).subscribe(
          result => {
            Swal.close();
            this.utils.showMessage("Success!", "The student was deleted succesfully.", "success");
            this.getStudents("");
          },
          error => {
            Swal.close();
            
            this.utils.showMessage("Error!", error.error.message, "error");
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

  searchStudent: OperatorFunction<string, readonly Student[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.students.filter(v => v.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  onPageSizeChange() {
    this.Paging.PageNumber = 1;
    this.getStudents(this.searchTerm);
  }

  onPage(pageNumber: any) {
    this.Paging.PageNumber = pageNumber;
    this.getStudents(this.searchTerm);
  }

}
