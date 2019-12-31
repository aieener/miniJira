import { NgModule } from '@angular/core';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';


export {
  QuoteService
}

@NgModule()
export class ServicesModule {
  static forRoot(){
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService
      ]
    }
  }
}
