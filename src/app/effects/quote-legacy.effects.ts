import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as actions from '../actions/quote-legacy.action';
import { QuoteService } from '../services/quote.service';

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions, private quoteService: QuoteService) {}

  @Effect()
  quote$: Observable<Action> = this.actions$.pipe(
    ofType<actions.QuoteAction>(actions.QUOTE),
    switchMap(() =>
      this.quoteService.getQuote().pipe(
        map(quote => new actions.QuoteSuccessAction(quote)),
        catchError(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
      )
    )
  );
}
