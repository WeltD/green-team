import React, { useState } from "react";
import { DatePicker, Switch, Space } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const RangeSelector = (props) => {
  const { switchAct, openAct, changeAct,} = props;
  //Range/Date picker State
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [range, setRange] = useState(1);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > range;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > range;
    return (
      !!tooEarly || !!tooLate || (current && current > dayjs().endOf("day"))
    );
  };

  const onChangeRangePicker = (val) => {
    if (changeAct != null) {
      changeAct(val);
    }
    setValue(val);
  };

  const onOpenChange = (open) => {
    if (openAct != null) {
      openAct(open);
    }
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const onChangeSwitch = (checked) => {
    if (switchAct != null) {
      switchAct(checked);
    }
    if (checked) {
      setRange(1);
    } else {
      setRange(155);
    }
  };

  return (
    <div>
      <Space>
        <RangePicker
          value={dates || value}
          disabledDate={disabledDate}
          onCalendarChange={(val) => setDates(val)}
          onChange={onChangeRangePicker}
          onOpenChange={onOpenChange}
          picker="month"
        />
        <Switch
          checkedChildren="Daily"
          unCheckedChildren="Monthly"
          defaultChecked
          onChange={onChangeSwitch}
        />
      </Space>
    </div>
  );
};

export default RangeSelector;
