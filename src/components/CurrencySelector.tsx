import { useMemo } from "react";
import { Autocomplete, TextField, type AutocompleteRenderInputParams } from "@mui/material";

interface CurrencyOption {
  value: string;
  label: string;
  searchText: string;
}

interface Props {
  currencies: Record<string, string>;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export function CurrencySelector({ currencies, selectedCurrency, onCurrencyChange }: Props) {
  const currencyOptions = useMemo(() => {
    return Object.entries(currencies).map(([code, name]) => ({
      value: code,
      label: code.toUpperCase(),
      searchText: `${code} ${name}`.toLowerCase(),
    }));
  }, [currencies]);

  const selectedOption = currencyOptions.find((option) => option.value === selectedCurrency) || null;

  const filterOptions = (options: CurrencyOption[], { inputValue }: { inputValue: string }) => {
    if (!inputValue) {
      return options;
    }

    const searchTerm = inputValue.toLowerCase();
    return options.filter((option) => option.searchText.includes(searchTerm));
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label="Select Currency" variant="outlined" />
  ); 

  return (
    <Autocomplete
      value={selectedOption}
      onChange={(_event, newValue) => {
        onCurrencyChange(newValue?.value || "");
      }}
      options={currencyOptions}
      getOptionLabel={(option) => option.label}
      filterOptions={filterOptions}
      renderInput={renderInput}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
}
