import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
      state.baseCurrency = action.payload;
    },
    setCurrencies: (state, action: PayloadAction<Record<string, string>>) => {
      state.currencies = action.payload;
    },
  },
});

export const { setBaseCurrency, setCurrencies } = currenciesSlice.actions;
export default currenciesSlice.reducer;
