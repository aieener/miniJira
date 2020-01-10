import { Component, OnInit, Inject, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Project } from 'src/app/domain';
import { ProjectService } from 'src/app/services/project.service';
import * as _ from 'lodash';
import { pipe, Subscription } from 'rxjs';
import { map, take, switchMap, reduce, filter } from 'rxjs/operators'
import { ActionSequence } from 'protractor';

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"]
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects: Project[];
  sub : Subscription;
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$.getAll().subscribe(projects => {
      console.log(projects);
      this.projects = projects;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }
    });
    dialogRef.afterClosed()
    .pipe(
      take(1), // this stream only emit when dialog close, if there is only one item in the stream, take will unsubscribe automatically
      filter(n => n), // not undefined or null, 确保里面有值
      map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)})),
      switchMap(v => this.service$.add(v))
    ).subscribe(project => {
      this.projects = [...this.projects, project];
      this.cd.markForCheck();
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: {
        thumbnails: this.getThumbnails(),
        project: project
      }
    });
    dialogRef.afterClosed()
    .pipe(
      take(1),
      filter(n => n),
      map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)})),
      switchMap(v => this.service$.update(v))
    ).subscribe(project => {
      const index = this.projects.map(p => p.id).indexOf(project.id);
      this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)];
      this.cd.markForCheck();
    });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Project',
        content: 'Are you sure to delete this project?'
      }
    });
    dialogRef.afterClosed()
    .pipe(
      take(1),
      filter(n => n),
      switchMap(_ => this.service$.del(project))
    ).subscribe(prj => {
      this.projects = this.projects.filter(p => p.id !== prj.id); 
      this.cd.markForCheck();
    });
  }

  private getThumbnails() {
    return _.range(0, 40)
    .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
