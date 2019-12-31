import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Project } from 'src/app/domain';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"]
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.service$.get("1").subscribe(res => this.projects = res);
  }

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Project',
        content: 'Are you sure to delete this project?'
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}
