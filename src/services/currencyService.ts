import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_CURRENCY_API_BASE_URL;

export interface ExchangeRatesResponse {
  date: string;
  [currencyCode: string]: Record<string, number> | string;
}

export const getCurrencies = async (): Promise<Record<string, string>> => {
  const url = `${API_BASE_URL}@latest/v1/currencies.json`;
  try {
    const response = await axios.get<Record<string, string>>(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch currencies');
  }
};

export const getExchangeRates = async (currencyCode: string, date: string): Promise<Record<string, number>> => {
  const url = `${API_BASE_URL}@${date}/v1/currencies/${currencyCode}.json`;
  try {
    const response = await axios.get<ExchangeRatesResponse>(url);
    return response.data[currencyCode] as Record<string, number>;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch exchange rates for ${currencyCode}`);
  }
};
