import React from "react";
import DatePicker from "react-date-picker";

const DateSelector = (props) => {
  return (
    <div>
      <DatePicker
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        maxDate={props.maxDate}
        className={props.className}
        calendarClassName={props.calendarClassName}
        yearPlaceholder="YYYY"
        dayPlaceholder="DD"
        monthPlaceholder="MM"
        minDate={props.minDate}
      />
    </div>
  );
};

export default DateSelector;
