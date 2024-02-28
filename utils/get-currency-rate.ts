import { ExchangeApiResult } from ".";

export default function getCurrencyRate(rates: ExchangeApiResult['rates'], codes: string[], code: string, defaultCode: string) {
    const selectedCode = codes.find(x => x === code) || defaultCode;
    const rate = rates[selectedCode];

    return rate;
}