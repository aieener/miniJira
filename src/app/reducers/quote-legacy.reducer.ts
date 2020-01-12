import {Quote} from '../domain';
import * as actions from '../actions/quote-legacy.action';

export const initialState: Quote = {
  "id": "10",
  "cn": "爱鸡蛋爱宝宝",
  "en": "Love Egg, Love Babe",
  "pic": "/assets/img/quotes/9.jpg"
};

export function reducer(state: Quote = initialState, action: actions.Actions): Quote {
  switch (action.type) {
    case actions.QUOTE_SUCCESS:
      return {...action.payload};
    case actions.QUOTE_FAIL:
    default:
      return state;
  }
}
