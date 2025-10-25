import { Container } from "@mui/material";
import "./App.scss";
import Header from "./components/Header";
import { CurrencySelector } from "./components/CurrencySelector";
import { fetchCurrencies, setBaseCurrency } from "./+store/currencies";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./+store/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector((state: RootState) => state.currencies.currencies);
  const selectedCurrency = useSelector((state: RootState) => state.currencies.baseCurrency);

  const onCurrencyChange = (currency: string) => {
    dispatch(setBaseCurrency(currency));
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <div className="mt-4">
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onCurrencyChange={onCurrencyChange}
            currencies={currencies}
          />
        </div>
      </Container>
    </>
  );
}

export default App;
