'use client';

import {
  CurrencyState,
  currencyReducer,
  CurrencyActions,
} from '@/utils/reducers';
import { useReducer } from 'react';

export default function useExchange() {
  const initialState: CurrencyState = {
    amount: 0,
    fromCurrencyValue: 1,
    toCurrencyValue: 1,
    convertedAmount: 0,
  };

  const [state, dispatch] = useReducer(currencyReducer, initialState);

  function exchangeCurrency(amount: number, fromBase: boolean) {
    if (fromBase) {
      dispatch({ type: CurrencyActions.SET_AMOUNT, payload: +amount.toFixed(2) });
    } else {
      dispatch({ type: CurrencyActions.SET_CONVERTED_AMOUNT, payload: +amount.toFixed(2) });
    }
  }

  function changeCurrency(value: number, isBase: boolean) {
    if (isBase) {
      dispatch({ type: CurrencyActions.SET_FROM_CURRENCY, payload: value });
    } else {
      dispatch({ type: CurrencyActions.SET_TO_CURRENCY, payload: value });
    }
  }

  return { exchangeCurrency, changeCurrency, ...state };
}
