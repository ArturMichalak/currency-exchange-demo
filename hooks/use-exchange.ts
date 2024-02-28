'use client';

import { CurrencyState, currencyReducer, CurrencyActions } from '@/utils/reducers';
import { useReducer } from 'react';

export default function useExchange() {
  const initialState: CurrencyState = {
    fromAmount: 0,
    fromRate: 1,
    toRate: 1,
    toAmount: 0,
  };

  const [state, dispatch] = useReducer(currencyReducer, initialState);

  function exchangeCurrency(amount: number, fromBase: boolean) {
    if (fromBase) {
      dispatch({
        type: CurrencyActions.SET_FROM_AMOUNT,
        payload: amount,
      });
    } else {
      dispatch({
        type: CurrencyActions.SET_TO_AMOUNT,
        payload: amount,
      });
    }
  }

  function changeCurrency(value: number, isBase: boolean) {
    if (isBase) {
      dispatch({ type: CurrencyActions.SET_FROM_RATE, payload: value });
    } else {
      dispatch({ type: CurrencyActions.SET_TO_RATE, payload: value });
    }
  }

  return { exchangeCurrency, changeCurrency, ...state };
}
