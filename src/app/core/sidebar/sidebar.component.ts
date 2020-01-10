import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {getDate} from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  today = 'day';
  @Output() navClicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

  handleClicked(ev: Event){
    ev.preventDefault()
    this.navClicked.emit();
  }

}
