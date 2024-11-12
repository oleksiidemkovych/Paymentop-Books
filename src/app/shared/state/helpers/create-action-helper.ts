import { createAction } from '@ngrx/store';

export const createActionHelper = <Payload>(actionType: string) => {
  return createAction(actionType, createPayload<Payload>());
};

export function createPayload<Payload>() {
  return (actionPayload?: Payload) => ({ payload: actionPayload });
}
