import { NgModule } from "@angular/core";
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote-legacy.effects';
import { AuthEffects } from './auth.effects';

@NgModule({
    imports: [
        EffectsModule.forRoot([
            QuoteEffects,
            AuthEffects
        ])
    ],
})
export class AppEffectsModule {
}
