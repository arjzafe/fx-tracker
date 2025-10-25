import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useMemo } from "react";

interface DateFieldProps {
  value: string | null;
  onChange: (date: string) => void;
}

export const DateField = ({ value, onChange }: DateFieldProps) => {
  const today = dayjs();

  const { minDate, maxDate } = useMemo(() => {
    return {
      minDate: today.subtract(90, "day"),
      maxDate: today,
    };
  }, [today]);

  const handleChange = (newValue: Dayjs | null) => {
    onChange(newValue?.format("YYYY-MM-DD") || "");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            size: "small",
          },
        }}
      />
    </LocalizationProvider>
  );
};
