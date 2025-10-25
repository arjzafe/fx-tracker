import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from "@mui/material";
import type { ExchangeRates } from "../+store/currencies";

interface ExchangeRatesTableProps {
  filteredExchangeRates: ExchangeRates;
  selectedCurrencies: string[];
  loading: boolean;
}

export function ExchangeRatesTable({ filteredExchangeRates, selectedCurrencies, loading }: ExchangeRatesTableProps) {

  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  const dates = Object.keys(filteredExchangeRates).sort();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            {selectedCurrencies.map((currency) => (
              <TableCell key={currency} sx={{ fontWeight: 'bold' }}>{currency.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dates.map((date) => (
            <TableRow key={date}>
              <TableCell sx={{ fontWeight: 'bold' }}>{formatDate(date)}</TableCell>
              {selectedCurrencies.map((currency) => (
                <TableCell key={currency}>
                  {filteredExchangeRates[date][currency]?.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) || "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}