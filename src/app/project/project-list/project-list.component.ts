import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";

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
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: " this is the data I send "
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }
}
