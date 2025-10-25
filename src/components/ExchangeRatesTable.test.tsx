import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ExchangeRatesTable } from "./ExchangeRatesTable";
import type { ExchangeRates } from "../+store/currencies";

describe("ExchangeRatesTable", () => {
  const mockExchangeRates: ExchangeRates = {
    "2025-01-15": {
      gbp: 1.1234,
      usd: 1.5678,
      eur: 0.8901,
    },
    "2025-01-16": {
      gbp: 1.2345,
      usd: 1.6789,
      eur: 0.9012,
    },
    "2025-01-17": {
      gbp: 1.3456,
      usd: 1.7890,
      eur: 0.9123,
    },
  };

  const defaultSelectedCurrencies = ["gbp", "usd", "eur"];

  beforeEach(() => {
    // Clear any mocks before each test
  });

  it("should display loading spinner when loading is true", () => {
    render(
      <ExchangeRatesTable
        filteredExchangeRates={{}}
        selectedCurrencies={defaultSelectedCurrencies}
        loading={true}
      />
    );

    const progressIndicator = screen.getByRole("progressbar");
    expect(progressIndicator).toBeInTheDocument();
  });

  it("should display table headers for Date and selected currencies", () => {
    render(
      <ExchangeRatesTable
        filteredExchangeRates={mockExchangeRates}
        selectedCurrencies={defaultSelectedCurrencies}
        loading={false}
      />
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const headers = within(table).getAllByRole("columnheader");
    expect(headers).toHaveLength(4);

    expect(headers[0]).toHaveTextContent("Date");
    expect(headers[1]).toHaveTextContent("GBP");
    expect(headers[2]).toHaveTextContent("USD");
    expect(headers[3]).toHaveTextContent("EUR");
  });

  it("should render exchange rates for each date", () => {
    render(
      <ExchangeRatesTable
        filteredExchangeRates={mockExchangeRates}
        selectedCurrencies={defaultSelectedCurrencies}
        loading={false}
      />
    );

    const table = screen.getByRole("table");
    const rows = within(table).getAllByRole("row");

    expect(rows).toHaveLength(4);
  });

  it("should format dates correctly (MM/DD/YYYY)", () => {
    render(
      <ExchangeRatesTable
        filteredExchangeRates={mockExchangeRates}
        selectedCurrencies={defaultSelectedCurrencies}
        loading={false}
      />
    );

    expect(screen.getByText("01/15/2025")).toBeInTheDocument();
    expect(screen.getByText("01/16/2025")).toBeInTheDocument();
    expect(screen.getByText("01/17/2025")).toBeInTheDocument();
  });

  it("should format currency rates with 4 decimal places", () => {
    render(
      <ExchangeRatesTable
        filteredExchangeRates={mockExchangeRates}
        selectedCurrencies={defaultSelectedCurrencies}
        loading={false}
      />
    );

    // this check is valuable I think for money should be 4 decimals
    expect(screen.getByText("1.1234")).toBeInTheDocument();
    expect(screen.getByText("1.5678")).toBeInTheDocument();
    expect(screen.getByText("0.8901")).toBeInTheDocument();
  });

  it("should display only columns for selected currencies", () => {
    render(
      <ExchangeRatesTable
        filteredExchangeRates={mockExchangeRates}
        selectedCurrencies={["gbp", "usd"]}
        loading={false}
      />
    );

    const table = screen.getByRole("table");
    const headers = within(table).getAllByRole("columnheader");
    
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent("Date");
    expect(headers[1]).toHaveTextContent("GBP");
    expect(headers[2]).toHaveTextContent("USD");
    expect(within(table).queryByText("EUR")).not.toBeInTheDocument();
  });
});

