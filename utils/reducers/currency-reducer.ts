export interface State {
  fromAmount: number;
  fromRate: number;
  toRate: number;
  toAmount: number;
}

export enum Actions {
  SET_FROM_AMOUNT = 'SET_FROM_AMOUNT',
  SET_FROM_RATE = 'SET_FROM_RATE',
  SET_TO_RATE = 'SET_TO_RATE',
  SET_TO_AMOUNT = 'SET_TO_AMOUNT',
}

type Action =
  | { type: Actions.SET_FROM_AMOUNT; payload: number }
  | { type: Actions.SET_FROM_RATE; payload: number }
  | { type: Actions.SET_TO_RATE; payload: number }
  | { type: Actions.SET_TO_AMOUNT; payload: number };

export default function currencyReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SET_FROM_AMOUNT:
      return { ...state, fromAmount: action.payload };
    case Actions.SET_FROM_RATE:
      return { ...state, fromRate: action.payload };
    case Actions.SET_TO_RATE:
      return { ...state, toRate: action.payload };
    case Actions.SET_TO_AMOUNT:
      return { ...state, toAmount: action.payload };
    default:
      return state;
  }
}
