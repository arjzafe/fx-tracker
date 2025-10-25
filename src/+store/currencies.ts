import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCurrencies, getExchangeRates } from "../services/currencyService";

interface CurrencyState {
  baseCurrency: string;
  currencies: Record<string, string>;
  selectedCurrencies: string[];
  exchangeRates: Record<string, number>;
}

const initialState: CurrencyState = {
  baseCurrency: "gbp",
  currencies: {},
  selectedCurrencies: ["usd", "eur", "jpy", "chf", "cad", "aud", "zar"],
  exchangeRates: {},
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      const newBaseCurrency = action.payload;
      state.baseCurrency = newBaseCurrency;
    },
    setCurrencies: (state, action: PayloadAction<Record<string, string>>) => {
      state.currencies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload;
    });
  },
});

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', async () => {
  const response = await getCurrencies();
  return response;
});

export const { setBaseCurrency, setCurrencies } = currenciesSlice.actions;
export default currenciesSlice.reducer;
