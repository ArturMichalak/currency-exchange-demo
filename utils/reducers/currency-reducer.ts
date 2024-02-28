export interface State {
  amount: number;
  fromCurrencyValue: number;
  toCurrencyValue: number;
  convertedAmount: number;
}

export enum Actions {
  SET_AMOUNT = 'SET_AMOUNT',
  SET_FROM_CURRENCY = 'SET_FROM_CURRENCY',
  SET_TO_CURRENCY = 'SET_TO_CURRENCY',
  SET_CONVERTED_AMOUNT = 'SET_CONVERTED_AMOUNT',
}

type Action =
  | { type: 'SET_AMOUNT'; payload: number }
  | { type: 'SET_FROM_CURRENCY'; payload: number }
  | { type: 'SET_TO_CURRENCY'; payload: number }
  | { type: 'SET_CONVERTED_AMOUNT'; payload: number };

export default function currencyReducer(
  state: State,
  action: Action,
): State {
  switch (action.type) {
    case Actions.SET_AMOUNT:
      return { ...state, amount: action.payload };
    case Actions.SET_FROM_CURRENCY:
      return { ...state, fromCurrencyValue: action.payload };
    case Actions.SET_TO_CURRENCY:
      return { ...state, toCurrencyValue: action.payload };
    case Actions.SET_CONVERTED_AMOUNT:
      return { ...state, convertedAmount: action.payload };
    default:
      return state;
  }
}
