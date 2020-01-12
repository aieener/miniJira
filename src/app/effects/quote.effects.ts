import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { QuoteService } from '../services/quote.service';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import * as actions from '../actions/quote.action'

@Injectable()
export class QuoteEffects {
    constructor(private actions$: Actions,private quoteService: QuoteService) {}

    quote$: Observable<Action> = createEffect(() =>
        this.actions$.pipe( // 监听action流
            ofType(actions.QuoteAction), // 捕获到Quote action
            mergeMap(action => // 在这里处理流
                this.quoteService.getQuote().pipe( // 调用quoteService, 对外部影响的操作
                    map(quote => actions.QuoteSuccessAction(quote)), //成功handler, reducer 会它进行处理
                    catchError((err: Error) => of(actions.QuoteErrorAction(err))) //error handler reducer 会来处理
                )
            )
        )
    );
}