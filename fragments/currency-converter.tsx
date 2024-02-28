'use client';

import { Card, Error, Loading } from '@/components';
import { useExchange, useFetch } from '@/hooks';
import { getCountryCodes, type ExchangeApiResult } from '@/utils';
import { type SelectChangeEvent } from '@mui/material/Select';
import { ChangeEventHandler, useEffect, useMemo } from 'react';
import ExchangeSide from './exchange-side';

type InputEvent = Parameters<ChangeEventHandler<HTMLInputElement>>[0];

interface CurrencyConverterProps {
  fetchUrl: string;
}

const defaultCurrency = 'USD';
const defaultConvertedCurrency = 'PLN';

export default function CurrencyConverter({
  fetchUrl,
}: CurrencyConverterProps) {
  const { data, error, loading } = useFetch<ExchangeApiResult>(fetchUrl);
  const {
    changeCurrency,
    exchangeCurrency,
    amount,
    convertedAmount,
    fromCurrencyValue,
    toCurrencyValue,
  } = useExchange();

  const countryCodes = useMemo(
    () => data && getCountryCodes(data.rates),
    [data],
  );

  useEffect(() => {
    if (!data) return;
    changeCurrency(data.rates[defaultCurrency], true);
    changeCurrency(data.rates[defaultConvertedCurrency], false);
  }, [data]);

  function onFromChange(event: SelectChangeEvent) {
    if (data === null) return;
    const countryCode =
      countryCodes?.find((x) => x === event.target.value) || defaultCurrency;
    const value = data.rates[countryCode];
    changeCurrency(value, true);
    exchangeCurrency((amount / value) * toCurrencyValue, false);
  }

  function onToChange(event: SelectChangeEvent) {
    if (data === null) return;
    const countryCode =
      countryCodes?.find((x) => x === event.target.value) || defaultCurrency;
    const value = data.rates[countryCode];
    changeCurrency(value, false);
    exchangeCurrency((convertedAmount / value) * fromCurrencyValue, true);
  }

  function onAmountChange(event: InputEvent) {
    if (data === null) return;
    const value = parseInt(event.target.value);
    exchangeCurrency(value, true);
    exchangeCurrency((value / fromCurrencyValue) * toCurrencyValue, false);
  }

  function onConvertedAmountChange(event: InputEvent) {
    if (data === null) return;
    const value = parseInt(event.target.value);
    exchangeCurrency(value, false);
    exchangeCurrency((value / toCurrencyValue) * fromCurrencyValue, true);
  }

  if (loading || data === null) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;
  return (
    <Card>
      <ExchangeSide
        onSelectChange={onFromChange}
        onInputChange={onAmountChange}
        defaultCurrency={defaultCurrency}
        amount={amount}
        codes={countryCodes!}
      >
        Amount
      </ExchangeSide>
      <ExchangeSide
        onSelectChange={onToChange}
        onInputChange={onConvertedAmountChange}
        defaultCurrency={defaultConvertedCurrency}
        amount={convertedAmount}
        codes={countryCodes!}
      >
        Converted Amount
      </ExchangeSide>
    </Card>
  );
}
