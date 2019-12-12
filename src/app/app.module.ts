import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CoreModule } from "./core/core.module";
import { MatSidenavModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginModule } from "./login/login.module";
import { ProjectModule } from "./project/project.module";
import { TaskModule } from './task/task.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    LoginModule,
    MatSidenavModule,
    AppRoutingModule,
    ProjectModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
