import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';

@Component({
  selector: "app-task-home",
  templateUrl: "./task-home.component.html",
  styleUrls: ["./task-home.component.scss"]
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: "Todo",
      tasks: [
        {
          id: 1,
          desc: "mission 1: go get a coffee from starbucks",
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: "zhangsan",
            avatar: "avatars:svg-11"
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          desc: "mission 2: finish homework",
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: "lisi",
            avatar: "avatars:svg-12"
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 2,
      name: "In progess",
      tasks: [
        {
          id: 1,
          desc: "mission 3: finish code review",
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: "wangwu",
            avatar: "avatars:svg-13"
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: "mission 4: plan a new project",
          completed: false,
          priority: 2,
          owner: {
            id: 2,
            name: "lisi",
            avatar: "avatars:svg-12"
          },
          dueDate: new Date()
        }
      ]
    }
  ];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {}
  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data:{lists: this.lists}}); // send data to CopyTaskComponent
  }
}
