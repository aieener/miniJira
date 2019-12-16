import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { DrapDropService } from '../drap-drop.service';

@Directive({
  selector: '[appDraggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {
  private _isDraggable = false;

  // app-draggable = true, invoke this setter to set, true is bind to val
  @Input('appDraggable')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }

  get isDraggable() {
    return this._isDraggable;
  }

  @Input() draggedClass: string;
  @Input() dragTag: string;
  @Input() dragData: any;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DrapDropService
  ) { }
  @HostListener('dragstart', ['$event'])
  onDragstart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      console.log(this.dragTag);
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({ tag: this.dragTag, data: this.dragData });
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    this.rd.removeClass(this.el.nativeElement, this.draggedClass);
  }

}
