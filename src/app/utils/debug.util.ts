import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
// programming towards interface, similar to go
declare module 'rxjs' {
    interface Observable<T> {
        debug: (... any) => Observable<T>;
    }
}

Observable.prototype.debug = function(message: string) {
    return this.do(
        (next) => {
            if(!environment.production) {
                console.log(message, next);
            }
        },
        (err) => {
            if(!environment.production) {
                console.error("ERROR>> " , message, err);
            }
        },
        () => {
            if(!environment.production) {
                console.log('Completed - ');
            }
        }
    )
}