import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ActionWithPayload } from '../models/action-with-payload-model';

@Injectable({ providedIn: 'root' })
export class StoreHelperService<TStore> {
  constructor(private store: Store<TStore>) {}

  dispatchAction(action: ActionWithPayload) {
    this.store.dispatch(action);
  }

  stateStreamSelector(selector: (state: TStore) => unknown): Observable<any> {
    return this.store.pipe(
      select(selector),
      catchError(err => {
        console.error(`stateStreamSelector error: ${err.message}`);
        // Return an empty observable to prevent breaking the observable chain
        return EMPTY;
      })
    );
  }
}
