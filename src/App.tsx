import { Container } from "@mui/material";
import "./App.scss";
import Header from "./components/Header";
import { CurrencySelector } from "./components/CurrencySelector";
import { fetchCurrencies, fetchExchangeRates, setBaseCurrency, setSelectedDate } from "./+store/currencies";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./+store/store";
import { ExchangeRatesTable } from "./components/ExchangeRatesTable";
import { DateField } from "./components/DateField";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector((state: RootState) => state.currencies.currencies);
  const baseCurrency = useSelector((state: RootState) => state.currencies.baseCurrency);
  const selectedDate = useSelector((state: RootState) => state.currencies.selectedDate);
  const availableDates = useSelector((state: RootState) => state.currencies.availableDates);

  const handleCurrencyChange = (currency: string) => {
    dispatch(setBaseCurrency(currency));
  };

  const handleSelectedDateChange = (date: string) => {
    dispatch(setSelectedDate(date));
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchExchangeRates({ baseCurrency, availableDates }));
  }, [dispatch, baseCurrency, availableDates]);

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <div className="mt-4">
          <CurrencySelector
            selectedCurrency={baseCurrency}
            onCurrencyChange={handleCurrencyChange}
            currencies={currencies}
          />
          <DateField
            value={selectedDate}
            onChange={handleSelectedDateChange}
          />
        </div>

        <div className="mt-2">
          <ExchangeRatesTable />
        </div>
      </Container>
    </>
  );
}

export default App;
