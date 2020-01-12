import { Quote } from '../domain';
import * as actions from '../actions/quote.action';
import { createReducer, on, Action } from '@ngrx/store';

/*
this version uses ngrx 8 factory approach
https://medium.com/@RupaniChirag/simple-angular-app-using-ngrx-8-store-and-effects-factory-methods-f3423b9f6d3b
*/
export const initialState: Quote = {
    "id": "10",
    "cn": "爱鸡蛋爱宝宝",
    "en": "Love Egg, Love Babe",
    "pic": "/assets/img/quotes/9.jpg"
};

const reducers = createReducer(
    initialState,
    on(actions.QuoteAction, state => state),
    on(actions.QuoteSuccessAction, (state: Quote, payload) => payload),
    on(actions.QuoteErrorAction, state => state)
  );

export function reducer(state: Quote = initialState, action: Action)  {
    return reducers(state, action);
}
