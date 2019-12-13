import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"]
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      name: "miniJIRA",
      desc: "this is to mock miniJIRA",
      coverImg: "assets/img/covers/0.jpg"
    },
    {
      name: "auto test",
      desc: "this is another mockProject",
      coverImg: "assets/img/covers/1.jpg"
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        title: 'New Project'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'Edit Project' } })
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data : {
      title: 'Delete Project',
      content : 'Are you sure to delete this project?'
    }});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}
