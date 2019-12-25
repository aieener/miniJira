import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from 'src/app/services/quote.service';
import { Quote } from 'src/app/domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    "id": "10",
    "cn": "爱鸡蛋爱宝宝",
    "en": "Love Egg, Love Babe",
    "pic": "/assets/img/quotes/9.jpg"
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$
      .getQuote()
      .subscribe(q => this.quote = q);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['yai@163.dev', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    })
  }
  // customize validator
  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^yai+/;
    if (pattern.test(c.value)) {
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
