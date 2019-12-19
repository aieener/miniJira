import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['yai@163.dev', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    })
  }
  // customize validator
  validate(c:FormControl):{[key:string]:any}{
    if(!c.value) {
      return null;
    }
    const pattern = /^yai+/;
    if(pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with yai'
    }
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify({ value, valid }));
  }


}
