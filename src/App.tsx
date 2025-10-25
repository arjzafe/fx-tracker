import { Container } from "@mui/material";
import "./App.scss";
import Header from "./components/Header";
import { CurrencySelector } from "./components/CurrencySelector";
import {
  fetchCurrencies,
  fetchExchangeRates,
  setBaseCurrency,
  setSelectedDate,
  setSelectedCurrencies,
  selectFilteredExchangeRates,
} from "./+store/currencies";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./+store/store";
import { ExchangeRatesTable } from "./components/ExchangeRatesTable";
import { DateField } from "./components/DateField";
import { CompareCurrenciesFilter } from "./components/CompareCurrenciesFilter";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector((state: RootState) => state.currencies.currencies);
  const baseCurrency = useSelector((state: RootState) => state.currencies.baseCurrency);
  const selectedDate = useSelector((state: RootState) => state.currencies.selectedDate);
  const availableDates = useSelector((state: RootState) => state.currencies.availableDates);
  const filteredExchangeRates = useSelector(selectFilteredExchangeRates);
  const selectedCurrencies = useSelector((state: RootState) => state.currencies.selectedCurrencies);
  const loading = useSelector((state: RootState) => state.currencies.loading);

  const handleCurrencyChange = (currency: string) => {
    dispatch(setBaseCurrency(currency));
  };

  const handleSelectedDateChange = (date: string) => {
    dispatch(setSelectedDate(date));
  };

  const handleSelectedCurrenciesChange = (currencies: string[]) => {
    dispatch(setSelectedCurrencies(currencies));
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchExchangeRates({ baseCurrency, availableDates }));
  }, [dispatch, baseCurrency, availableDates]);

  return (
    <div className="app-container">
      <Header />
      <Container maxWidth="xl">
        <div className="content-wrapper">
          <div className="controls-section">
            <div className="controls-title">Exchange Rate Controls</div>

            <div className="d-flex">
              <div className="base-container">
                <CurrencySelector
                  selectedCurrency={baseCurrency}
                  onCurrencyChange={handleCurrencyChange}
                  currencies={currencies}
                />
              </div>

              <div className="date-container">
                <DateField
                  value={selectedDate}
                  onChange={handleSelectedDateChange}
                />
              </div>

              <div className="compare-container">
                <CompareCurrenciesFilter
                  selectedCurrencies={selectedCurrencies}
                  currencies={currencies}
                  onCurrenciesChange={handleSelectedCurrenciesChange}
                />
              </div>
            </div>
          </div>

          <div className="table-section mt-2">
            <ExchangeRatesTable
              filteredExchangeRates={filteredExchangeRates}
              selectedCurrencies={selectedCurrencies}
              loading={loading}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
