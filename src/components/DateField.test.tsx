import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DateField } from "./DateField";

describe("DateField", () => {
  const mockOnChange = vi.fn();
  const defaultDate = "2025-10-25";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with the correct label", () => {
    render(<DateField value={null} onChange={mockOnChange} />);

    const labels = screen.getAllByText(/Select Date/i);
    expect(labels.length).toBeGreaterThan(0);
  });

  it("should display the received value", () => {
    render(<DateField value={defaultDate} onChange={mockOnChange} />);

    const calendarButton = screen.getByRole("button", { name: /Choose date/i });
    expect(calendarButton).toBeInTheDocument();
    
    // The button aria-label includes the selected date
    expect(calendarButton).toHaveAttribute("aria-label", expect.stringContaining("Oct 25, 2025"));
  });

  it("should display null when value is null", () => {
    render(<DateField value={null} onChange={mockOnChange} />);

    const calendarButton = screen.getByRole("button", { name: /Choose date/i });
    expect(calendarButton).toBeInTheDocument();
    // The button aria-label doesn't include a selected date when value is null
    expect(calendarButton).toHaveAttribute("aria-label", "Choose date");
  });

  // TODO: Add test for the minimum selectable date as 90 days from current date it's complicated time consuming
  // TODO: Add test for the maximum selectable date as today it's complicated time consuming
});

