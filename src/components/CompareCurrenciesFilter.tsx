import { useMemo, useState } from "react";
import { Autocomplete, TextField, Checkbox, type AutocompleteRenderInputParams, Alert, Snackbar } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { type CurrencyOption } from "../types/currency";

interface CompareCurrenciesFilterProps {
  selectedCurrencies: string[];
  currencies: Record<string, string>;
  min?: number;
  max?: number;
  onCurrenciesChange: (currencies: string[]) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function CompareCurrenciesFilter({
  selectedCurrencies,
  currencies,
  min = 3,
  max = 7,
  onCurrenciesChange,
}: CompareCurrenciesFilterProps) {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [openAlert, setOpenAlert] = useState(false);

  const currencyOptions = useMemo(() => {
    return Object.entries(currencies).map(([code]) => ({
      value: code,
      label: `${code.toUpperCase()}`,
    }));
  }, [currencies]);

  const selectedOptions = useMemo(() => {
    return currencyOptions.filter((option) => selectedCurrencies.includes(option.value));
  }, [currencyOptions, selectedCurrencies]);

  const filterOptions = (options: CurrencyOption[], { inputValue }: { inputValue: string }) => {
    if (!inputValue) {
      return options;
    }

    const searchTerm = inputValue.toLowerCase();
    return options.filter(
      (option) => option.value.toLowerCase().includes(searchTerm) || option.label.toLowerCase().includes(searchTerm)
    );
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: CurrencyOption[]) => {
    const newSelectedCount = newValue.length;

    if (newSelectedCount < min) {
      setAlertMessage(`Minimum ${min} currencies must be selected. You cannot remove this currency.`);
      setOpenAlert(true);
      return;
    }

    if (newSelectedCount > max) {
      setAlertMessage(`Maximum ${max} currencies can be selected. You cannot add more currencies.`);
      setOpenAlert(true);
      return;
    }

    const newSelectedCurrencies = newValue.map((option) => option.value);
    onCurrenciesChange(newSelectedCurrencies);
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      label="Compare Currencies"
      variant="outlined"
      size="small"
    />
  );

  return (
    <>
      <Autocomplete
        size="small"
        multiple
        disableCloseOnSelect
        clearOnEscape={false}
        disableClearable={true}
        value={selectedOptions}
        onChange={handleChange}
        options={currencyOptions}
        getOptionLabel={(option) => option.label}
        filterOptions={filterOptions}
        renderInput={renderInput}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{ padding: "4px 8px" }}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8, padding: "2px" }}
              checked={selected}
              size="small"
            />
            {option.label}
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{
          maxWidth: "660px",
        }}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
