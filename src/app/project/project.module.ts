import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectItemComponent } from "./project-item/project-item.component";
import { NewProjectComponent } from "./new-project/new-project.component";
import { InviteComponent } from "./invite/invite.component";
import { ProjectRoutingModule } from "./project-router.module";

@NgModule({
  declarations: [ProjectListComponent, ProjectItemComponent, NewProjectComponent, InviteComponent],
  entryComponents: [NewProjectComponent, InviteComponent],
  imports: [SharedModule, ProjectRoutingModule]
})
export class ProjectModule {}
