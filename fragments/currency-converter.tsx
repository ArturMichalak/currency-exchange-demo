'use client';

import { Card, Error } from '@/components';
import { useExchange, useFetch } from '@/hooks';
import { getCountryCodes, type ExchangeApiResult } from '@/utils';
import { type SelectChangeEvent } from '@mui/material/Select';
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import ExchangeSide from './exchange-side';

interface CurrencyConverterProps {
  fetchUrl: string;
}

export default function CurrencyConverter({
  fetchUrl,
}: CurrencyConverterProps) {
  const { data, error, loading } = useFetch<ExchangeApiResult>(fetchUrl);
  const { changeCurrency, exchangeCurrency, amount, convertedAmount, fromCurrencyValue, toCurrencyValue } = useExchange();

  const countryCodes = useMemo(
    () => data && getCountryCodes(data.rates),
    [data],
  );

  useEffect(() => {
    if (!data) return;
    changeCurrency(data.rates['USD'], true);
    changeCurrency(data.rates['PLN'], false)
  }, [data])

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
    
    exchangeCurrency(value, true);
    exchangeCurrency(
      (value / fromCurrencyValue) * toCurrencyValue,
      false,
    );
  }

  function onConvertedAmountChange(
    event: Parameters<ChangeEventHandler<HTMLInputElement>>['0'],
  ) {
    if (data === null) return;
    const value = parseInt(event.target.value);
    exchangeCurrency(value, false);
    exchangeCurrency(
      (value / toCurrencyValue) * fromCurrencyValue,
      true,
    );
  }

  if (loading || data === null) return 'Loading...';
  if (error) return <Error errorMessage={error.message} />;
  return (
    <Card>
      <ExchangeSide
        onSelectChange={onFromChange}
        onInputChange={onAmountChange}
        defaultCurrency='USD'
        amount={amount}
        codes={countryCodes!}
      >
        Amount
      </ExchangeSide>
      <ExchangeSide
        onSelectChange={onToChange}
        onInputChange={onConvertedAmountChange}
        defaultCurrency='PLN'
        amount={convertedAmount}
        codes={countryCodes!}
      >
        Converted Amount
      </ExchangeSide>
    </Card>
  );
}
