import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      "name" : "miniJIRA",
      "desc" : "this is to mock miniJIRA",
      "coverImg" : "assets/img/covers/0.jpg"
    },
    {
      "name" : "auto test",
      "desc" : "this is another mockProject",
      "coverImg" : "assets/img/covers/1.jpg"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
