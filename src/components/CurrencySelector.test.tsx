import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CurrencySelector } from "./CurrencySelector";
import { mockCurrencyData } from "../__mocks__/mockCurrencyData";

describe("CurrencySelector", () => {
  const mockOnCurrencyChange = vi.fn();
  const defaultSelectedCurrency = "gbp";

  beforeEach(() => {
    render(
      <CurrencySelector
        currencies={mockCurrencyData}
        selectedCurrency={defaultSelectedCurrency}
        onCurrencyChange={mockOnCurrencyChange}
      />
    );
  });

  it("renders the component with the correct label", () => {
    expect(screen.getByLabelText(/Select Currency/i)).toBeInTheDocument();
  });

  it("should select the selected currency", async () => {
    const textbox = screen.getByLabelText(/Select Currency/i);

    expect(textbox).toHaveValue(defaultSelectedCurrency.toUpperCase());
  });

  it("should change the selected value when a different currency is selected", async () => {
    const textbox = screen.getByLabelText(/Select Currency/i);

    await userEvent.click(textbox);
    const listBox = await screen.findByRole("listbox");
    const usdOption = within(listBox).getByText("USD");
    await userEvent.click(usdOption);

    expect(textbox).toHaveValue("USD");
    expect(mockOnCurrencyChange).toHaveBeenCalledExactlyOnceWith("usd");
  });
});
