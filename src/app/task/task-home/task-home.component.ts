import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';

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

  ngOnInit() { }
  launchNewTaskDialog() {
    // this.dialog.open(NewTaskComponent);
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: 'New Task',
      }
    })
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } }); // send data to CopyTaskComponent
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      data: {
        title: 'Edit Task',
        task: task
      }
    })
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: {
          title: 'Delete List',
          content: 'Are you sure to delete the Task List?'
        }
      })
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchNewTaskListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: 'New Task List Name'

      }
    });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: {
        title: 'Edit Task List Name'
      }
    });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item')
        break;
      case 'task-list':
        console.log('handing list')
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string) {
    console.log(desc);

  }
}
