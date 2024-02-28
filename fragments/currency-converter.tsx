'use client';

import { Card, Error } from '@/components';
import { useExchange, useFetch } from '@/hooks';
import { getCountryCodes, type ExchangeApiResult } from '@/utils';
import { MenuItem } from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { ChangeEventHandler, useMemo, useReducer } from 'react';
import ExchangeSide from './exchange-side';

interface CurrencyConverterProps {
  fetchUrl: string;
}

export default function CurrencyConverter({
  fetchUrl,
}: CurrencyConverterProps) {
  const { data, error, loading } = useFetch<ExchangeApiResult>(fetchUrl);
  const { changeCurrency, exchangeCurrency, ...rest } = useExchange();

  const countryCodes = useMemo(
    () => data && getCountryCodes(data.rates),
    [data],
  );

  function onFromChange(event: SelectChangeEvent) {
    if (data === null) return;
    const value = data.rates[event.target.value];
    changeCurrency(value, true);
  }

  function onToChange(event: SelectChangeEvent) {
    if (data === null) return;
    const value = data.rates[event.target.value];
    changeCurrency(value, false);
  }

  function onAmountChange(
    event: Parameters<ChangeEventHandler<HTMLInputElement>>[0],
  ) {
    if (data === null) return;
    const value = parseInt(event.target.value);
    changeCurrency(value, true);
  }

  function onConvertedAmountChange(
    event: Parameters<ChangeEventHandler<HTMLInputElement>>['0'],
  ) {
    if (data === null) return;
    const value = parseInt(event.target.value);
    changeCurrency(value, false);
  }

  if (loading || data === null) return 'Loading...';
  if (error) return <Error errorMessage={error.message} />;
  return (
    <Card>
      <ExchangeSide
        onSelectChange={onFromChange}
        onInputChange={onAmountChange}
        defaults={{ input: 0, select: 'USD' }}
        codes={countryCodes!}
      >
        Amount
      </ExchangeSide>
      <ExchangeSide
        onSelectChange={onToChange}
        onInputChange={onConvertedAmountChange}
        defaults={{ input: 0, select: 'PLN' }}
        codes={countryCodes!}
      >
        Converted Amount
      </ExchangeSide>
    </Card>
  );
}
