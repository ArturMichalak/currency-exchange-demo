'use client';

import { Card, Error, Loading } from '@/components';
import { useExchange, useFetch } from '@/hooks';
import { getCountryCodes, getCurrencyRate, type ExchangeApiResult, toFixedNumber } from '@/utils';
import { type SelectChangeEvent } from '@mui/material/Select';
import { ChangeEventHandler, useEffect, useMemo } from 'react';
import ExchangeSide from './exchange-side';

type InputEvent = Parameters<ChangeEventHandler<HTMLInputElement>>[0];

interface CurrencyConverterProps {
  fetchUrl: string;
}

const defaultFromCurrency = 'USD';
const defaultToCurrency = 'PLN';

export default function CurrencyConverter({ fetchUrl }: CurrencyConverterProps) {
  const { data, error, loading } = useFetch<ExchangeApiResult>(fetchUrl);
  const { changeCurrency, exchangeCurrency, fromAmount, fromRate, toAmount, toRate } = useExchange();

  const countryCodes = useMemo(() => (data && getCountryCodes(data.rates)) || [], [data]);

  useEffect(() => {
    if (!data) return;
    changeCurrency(data.rates[defaultFromCurrency], true);
    changeCurrency(data.rates[defaultToCurrency], false);
  }, [data]);

  function handleRateChange(event: SelectChangeEvent, isBase: boolean) {
    if (data === null) return;
    const rate = getCurrencyRate(data.rates, countryCodes, event.target.value, defaultFromCurrency);

    changeCurrency(rate, isBase);
    const [amount, dstRate] = isBase ? [fromAmount, toRate] : [toAmount, fromRate];
    exchangeCurrency((amount / rate) * dstRate, !isBase);
  }

  function handleAmountChange(event: InputEvent, isBase: boolean) {
    if (data === null) return;
    const value = toFixedNumber(parseFloat(event.target.value));
    if (isNaN(value) || value < 0) return;
    exchangeCurrency(value, isBase);
    const [rate, dstRate] = isBase ? [fromRate, toRate] : [toRate, fromRate];
    exchangeCurrency(toFixedNumber(value / rate * dstRate), !isBase);
  }

  if (loading || data === null) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;
  return (
    <Card>
      <ExchangeSide
        onSelectChange={(e) => handleRateChange(e, true)}
        onInputChange={(e) => handleAmountChange(e, true)}
        defaultCurrency={defaultFromCurrency}
        amount={fromAmount}
        codes={countryCodes!}
      >
        Amount
      </ExchangeSide>
      <ExchangeSide
        onSelectChange={(e) => handleRateChange(e, false)}
        onInputChange={(e) => handleAmountChange(e, false)}
        defaultCurrency={defaultToCurrency}
        amount={toAmount}
        codes={countryCodes!}
      >
        Converted Amount
      </ExchangeSide>
    </Card>
  );
}
