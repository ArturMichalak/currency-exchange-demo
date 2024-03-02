import { ExchangeApiResult } from '.';

export default function getCountryCodes(rates: ExchangeApiResult['rates']) {
  return Object.keys(rates);
}
