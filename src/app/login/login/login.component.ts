import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Quote } from 'src/app/domain/quote.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/quote-legacy.action';
import * as authActions from '../../actions/auth.action';

/**
 * The benifit of using Redux:
 *  1. loginComponent is isolated from modifying states, 
 *     such that your colleague won't be able to change the state by mistake.
 *     All operations on State must go through a legel Action
 *  2. encapsulate the details about how the state has being changing
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;
  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {
      this.quote$ = this.store$.pipe(select(fromRoot.getQuoteState));
  }

  ngOnInit() {
    this.form = this.fb.group({
      // email: ['yai@163.dev', Validators.compose([Validators.required, Validators.email, this.validate])],
      email: ['yai@163.dev', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    // this.store$.dispatch( actions.QuoteAction());
    this.store$.dispatch( new actions.QuoteAction());
  }
  // // customize validator
  // validate(c: FormControl): { [key: string]: any } {
  //   if (!c.value) {
  //     return null;
  //   }
  //   const pattern = /^yai+/;
  //   if (pattern.test(c.value)) {
  //     return null;
  //   }
  //   return {
  //     emailNotValid: 'The email must start with yai'
  //   }
  // }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if(!valid) return;
    this.store$.dispatch(new authActions.LoginAction(value));
  }


}
