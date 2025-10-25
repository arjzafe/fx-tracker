import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCurrencies, getExchangeRates } from "../services/currencyService";
import dayjs from "dayjs";

interface ExchangeRates {
  [date: string]: Record<string, number>;
}

interface CurrencyState {
  baseCurrency: string;
  selectedDate: string;
  availableDates: string[];
  currencies: Record<string, string>;
  selectedCurrencies: string[];
  exchangeRates: ExchangeRates;
}

const getLast7Days = (date: string): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    dates.push(dayjs(date).subtract(i, "day").format("YYYY-MM-DD"));
  }
  return dates;
};

const initialState: CurrencyState = {
  baseCurrency: "gbp",
  selectedDate: dayjs().format("YYYY-MM-DD"),
  availableDates: getLast7Days(dayjs().format("YYYY-MM-DD")),
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
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
      state.availableDates = getLast7Days(action.payload);
    },
    setCurrencies: (state, action: PayloadAction<Record<string, string>>) => {
      state.currencies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload;
    });
    builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
      state.exchangeRates = action.payload;
    });
  },
});

export const fetchCurrencies = createAsyncThunk("currencies/fetchCurrencies", async () => {
  const response = await getCurrencies();
  return response;
});

export const fetchExchangeRates = createAsyncThunk(
  "currencies/fetchExchangeRates",
  async ({ baseCurrency, availableDates }: { baseCurrency: string; availableDates: string[] }) => {
    const exchangeRates: ExchangeRates = {};

    for (const date of availableDates) {
      const response = await getExchangeRates(baseCurrency, date);
      exchangeRates[date] = response;
    }

    return exchangeRates;
  }
);

export const { setBaseCurrency, setCurrencies, setSelectedDate } = currenciesSlice.actions;
export default currenciesSlice.reducer;
