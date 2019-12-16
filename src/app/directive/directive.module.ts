import { NgModule } from '@angular/core';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';
import { DrapDropService } from './drap-drop.service';

@NgModule({
  declarations: [DragDirective, DropDirective],
  exports: [
    DragDirective, DropDirective
  ],
  providers: [
    DrapDropService
  ]
})
export class DirectiveModule { }
