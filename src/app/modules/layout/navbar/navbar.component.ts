import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Sumadi Students App';
  links = [
    { title: 'Students list', fragment: '/students' },
    { title: 'Create student', fragment: '/students/create' }
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
