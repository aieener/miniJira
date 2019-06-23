import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  items: string[];
  constructor() { }

  ngOnInit() {
    const nums = Array.from({length: 16}, (v,k) => k + 1);
    this.items = nums.map(d => `avatars:svg-${d}`);
    // avatars:svg-
  }

}
