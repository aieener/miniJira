import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducerMap, combineReducers, MetaReducer, ActionReducer, compose, createFeatureSelector } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as fromQuote from './quote-legacy.reducer';
import * as fromAuth from './auth.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import { Quote, Auth } from '../domain';

export interface State {
    quote: Quote;
    auth: Auth;
}

export const reducers: ActionReducerMap<State> = {
    quote: fromQuote.reducer,
    auth: fromAuth.reducer
}

// with the new version 8+ we don't need the following anymore
const prodReducers : ActionReducer<State> = combineReducers(reducers);
const devReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);// storeFreeze protect store
//---------
// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? [
//     logger,
//     storeFreeze,
//     storeStateGuard
//   ]
//   : [storeStateGuard];

//   export function storeStateGuard(reducer: ActionReducer<State>): ActionReducer<State> {
//     return function (state, action) {
//       if (action.type === authActions.LOGOUT) {
//         return reducer(undefined, action);
//       }
  
//       return reducer(state, action);
//     };
//   }

export const getAuthState = createFeatureSelector<Auth>('auth');
export const getQuoteState = createFeatureSelector<Quote>('quote');

@NgModule({
  imports: [
    StoreModule.forRoot(reducers), // combineReducers happened here
    environment.production ? [] : StoreDevtoolsModule.instrument() 
    // devTool gives api to redux chrome plugin 
    // and so we turn it down in the prod env
  ]
})
export class AppStoreModule {}