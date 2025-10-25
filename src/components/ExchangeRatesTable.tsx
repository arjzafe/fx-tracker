import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import type { ExchangeRates } from "../+store/currencies";

interface ExchangeRatesTableProps {
  filteredExchangeRates: ExchangeRates;
  selectedCurrencies: string[];
  loading: boolean;
}

export function ExchangeRatesTable({ filteredExchangeRates, selectedCurrencies, loading }: ExchangeRatesTableProps) {
  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  const dates = Object.keys(filteredExchangeRates).sort();

  if (dates.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography variant="body1" color="text.secondary">
          No exchange rates available
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
            <TableCell sx={{ fontWeight: 700, color: "#1976d2" }}>Date</TableCell>
            {selectedCurrencies.map((currency) => (
              <TableCell
                key={currency}
                sx={{ fontWeight: 700, color: "#1976d2", textAlign: "right" }}
              >
                {currency.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dates.map((date) => (
            <TableRow key={date}>
              <TableCell sx={{ fontWeight: 600, color: "#333" }}>{formatDate(date)}</TableCell>
              {selectedCurrencies.map((currency) => (
                <TableCell
                  key={currency}
                  sx={{ textAlign: "right", color: "#555" }}
                >
                  {filteredExchangeRates[date][currency]?.toLocaleString("en-US", {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                  }) || "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
