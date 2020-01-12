import { createAction, props } from '@ngrx/store';
import { Quote } from '../domain';

export const QUOTE = '[Quote] Quote';
export const QUOTE_SUCCESS = '[Quote] Quote Success';
export const QUOTE_FAIL = '[Quote] Quote Fail';

export const QuoteAction = createAction(QUOTE);
export const QuoteSuccessAction = createAction(QUOTE_SUCCESS, props<Quote>());
export const QuoteErrorAction = createAction(QUOTE_FAIL, props<Error>());

