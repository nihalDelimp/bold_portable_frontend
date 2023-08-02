import React from "react";
import DatePicker from "react-datepicker";

interface MyComponentProps {
  selectedDate: Date | null;
  minDate: Date;
  handleDateChange: (date: Date | null) => void;
}

function DateSelector(props: MyComponentProps) {
  const { selectedDate, handleDateChange, minDate } = props;

  const CustomInput = ({ value, onClick }: any) => (
    <input
      value={value}
      onClick={onClick}
      placeholder="Select date"
      readOnly
      style={{ cursor: "pointer" }}
    />
  );

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy"
        className="custom-date-picker"
        minDate={minDate}
        customInput={<CustomInput />}
      />
    </div>
  );
}

export default DateSelector;
