'use client';

import { type State, fetchReducer, Actions } from '@/utils/reducers';
import { useEffect, useReducer } from 'react';

export default function useFetch<T>(url: string) {
  const initialState: State<T> = {
    data: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(fetchReducer<T>, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: Actions.FETCH_INIT });

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const result: T = await response.json();
        dispatch({ type: Actions.FETCH_SUCCESS, payload: result });
      } catch (error) {
        dispatch({ type: Actions.FETCH_FAILURE, payload: error as Error });
      }
    };

    fetchData();
  }, [url]);

  return state;
}
