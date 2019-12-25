import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { range } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  items: string[];
  form: FormGroup;
  avatars$: Observable<string[]>;
  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder) {

    this.avatars$ = range(1, 16).pipe(
      map(i => `${this.avatarName}:svg-${i}`),
      reduce((r: string[], x: string) => [...r, x], [])
    );
  }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    const nums = Array.from({ length: 16 }, (v, k) => k + 1);
    this.items = nums.map(d => `avatars:svg-${d}`);
    // avatars:svg-
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1990-01-01'],
    })
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if(!valid) return;
    console.log(value);
  }

}
