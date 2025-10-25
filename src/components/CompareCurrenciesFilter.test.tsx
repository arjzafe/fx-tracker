import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CompareCurrenciesFilter } from "./CompareCurrenciesFilter";
import { mockCurrencyData } from "../__mocks__/mockCurrencyData";

describe("CompareCurrenciesFilter", () => {
  const mockOnCurrenciesChange = vi.fn();
  const defaultSelectedCurrencies = ["gbp", "usd", "eur"];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with the correct label", () => {
    render(
      <CompareCurrenciesFilter
        selectedCurrencies={defaultSelectedCurrencies}
        currencies={mockCurrencyData}
        onCurrenciesChange={mockOnCurrenciesChange}
      />
    );

    expect(screen.getByLabelText(/Compare Currencies/i)).toBeInTheDocument();
  });

  it("should display the selected currencies", () => {
    render(
      <CompareCurrenciesFilter
        selectedCurrencies={defaultSelectedCurrencies}
        currencies={mockCurrencyData}
        onCurrenciesChange={mockOnCurrenciesChange}
      />
    );

    const textbox = screen.getByLabelText(/Compare Currencies/i);
    expect(textbox).toBeInTheDocument();

    expect(screen.getByText("GBP")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });

  it("should show notification when minimum limit is reached when removing", async () => {
    const user = userEvent.setup();

    render(
      <CompareCurrenciesFilter
        selectedCurrencies={defaultSelectedCurrencies}
        currencies={mockCurrencyData}
        onCurrenciesChange={mockOnCurrenciesChange}
      />
    );

    const deleteIcons = screen.getAllByTestId("CancelIcon");
    await user.click(deleteIcons[2]); // EUR

    // Wait for the delat notification
    await waitFor(() => {
      expect(screen.getByText(/Minimum 3 currencies must be selected/i)).toBeInTheDocument();
    });
  });

  it("should show notification when maximum limit is reached when adding", async () => {
    const user = userEvent.setup();
    const maxSelectedCurrencies = ["gbp", "usd", "eur", "jpy", "chf", "cad", "aud"];

    render(
      <CompareCurrenciesFilter
        selectedCurrencies={maxSelectedCurrencies}
        currencies={mockCurrencyData}
        onCurrenciesChange={mockOnCurrenciesChange}
      />
    );

    const textbox = screen.getByLabelText(/Compare Currencies/i);
    await user.click(textbox);

    await screen.findByRole("listbox");
    const zarOption = screen.getByText("ZAR");
    await user.click(zarOption);

    // Wait for the delay notification
    await waitFor(() => {
      expect(screen.getByText(/Maximum 7 currencies can be selected/i)).toBeInTheDocument();
    });
  });
});
