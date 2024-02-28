export interface State<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export enum Actions {
  FETCH_INIT = 'FETCH_INIT',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE',
}

type Action<T> =
  | { type: Actions.FETCH_INIT }
  | { type: Actions.FETCH_SUCCESS; payload: T }
  | { type: Actions.FETCH_FAILURE; payload: Error };

export default function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case Actions.FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Actions.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case Actions.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
