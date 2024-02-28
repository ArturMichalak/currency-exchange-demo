export default interface ExchangeApiResult {
    provider: string;
    terms: string;
    base: string;
    date: Date;
    time_last_updated: number;
    rates: {[key: string]: number}
}