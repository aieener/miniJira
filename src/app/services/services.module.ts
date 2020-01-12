import { NgModule } from '@angular/core';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';


export {
  QuoteService,
  ProjectService,
  TaskListService,
  TaskService,
  AuthService,
  AuthGuardService,
  UserService,
}

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService,
        AuthService,
        AuthGuardService,
        UserService,
      ]
    }
  }
}
