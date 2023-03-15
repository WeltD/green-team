import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  DatePicker,
  Switch,
  Radio,
  Steps,
  Typography,
  Space,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import BarChart from "../../../components/Charts/BarChart";
import StatsBar from "../../../components/StatsBar";

import useWebSocket from "react-use-websocket";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const CancellationBar = () => {
  // Websocket connection
  const { readyState, getWebSocket, sendMessage, lastMessage } = useWebSocket(
    "wss://50heid0mqj.execute-api.eu-west-1.amazonaws.com/production",
    {
      reconnectAttempts: 100,
      reconnectInterval: 3000,
    }
  );

  // State variables
  //Range/Date picker State
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [range, setRange] = useState(1);

  //Radio State
  const [radioValue, setRadioValue] = useState(1);

  //Websocket connection State
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [massageAction, setMassageAction] = useState("cancellationDaily");

  //Chart State
  const [chartData, setChartData] = useState([]);

  //StatsBar State
  const [statsBarData, setStatsBarData] = useState([[], []]);

  //Steps State
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("process");

  useEffect(() => {
    if (lastMessage) {
      try {
        const chartData = () => {
          switch (radioValue) {
            case 1:
              if (massageAction === "cancellationDaily") {
                return JSON.parse(lastMessage?.data).datesRates;
              } else {
                return JSON.parse(lastMessage?.data).monthsRates;
              }
            case 2:
              if (massageAction === "cancellationDaily") {
                return JSON.parse(lastMessage?.data).datesCancelled;
              } else {
                return JSON.parse(lastMessage?.data).monthsCancelled;
              }
            default:
              return [];
          }
        };

        const statsBarData = () => {
          switch (radioValue) {
            case 1:
              return JSON.parse(lastMessage?.data).totalRates;
            case 2:
              return JSON.parse(lastMessage?.data).totalCancelled;
            default:
              return [];
          }
        };

        if (chartData().length === 0) {
          setChartData([]);
          setStatsBarData([[], []]);
        } else {
          setChartData(chartData());
          setStatsBarData(statsBarData());
        }
      } catch (error) {
        setStatus("error");
      }

      setCurrent(2);
    }
  }, [lastMessage]);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > range;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > range;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    setCurrent(0);
    setStatus("process");
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const onChangeSwitch = (checked) => {
    setValue(null);
    setChartData([]);
    setStatsBarData([[], []]);
    setCurrent(0);
    setStartDate(null);
    setEndDate(null);
    setStatus("process");
    if (checked) {
      setRange(1);
      setMassageAction("cancellationDaily");
    } else {
      setRange(32);
      setMassageAction("cancellationMonthly");
    }
  };

  const onChangeRadio = (e) => {
    setRadioValue(e.target.value);
    try {
      const chartData = () => {
        switch (e.target.value) {
          case 1:
            if (massageAction === "cancellationDaily") {
              return JSON.parse(lastMessage?.data).datesRates;
            } else {
              return JSON.parse(lastMessage?.data).monthsRates;
            }
          case 2:
            if (massageAction === "cancellationDaily") {
              return JSON.parse(lastMessage?.data).datesCancelled;
            } else {
              return JSON.parse(lastMessage?.data).monthsCancelled;
            }
          default:
            return [];
        }
      };

      const statsBarData = () => {
        switch (e.target.value) {
          case 1:
            return JSON.parse(lastMessage?.data).totalRates;
          case 2:
            return JSON.parse(lastMessage?.data).totalCancelled;
          default:
            return [];
        }
      };

      if (chartData().length === 0) {
        setChartData([]);
        setStatsBarData([[], []]);
      } else {
        setChartData(chartData());
        setStatsBarData(statsBarData());
      }
    } catch (error) {
      if (current === 2) {
        setStatus("error");
      }
    }
  };

  const onChangeRangePicker = (dates) => {
    setStartDate(dates[0].startOf("month").format("YYYY-MM-DD") + " T00:00:00");
    setEndDate(dates[1].endOf("month").format("YYYY-MM-DD") + " T23:59:59");
    setValue(dates);
  };

  // Compile the date and action into a massage and send it to the backend
  const onClickSubmit = () => {
    const data = {
      action: massageAction,
      startDate: startDate,
      endDate: endDate,
    };
    setCurrent(1);
    setStatus("process");

    // Send the massage to the backend
    if (readyState === 1) {
      // Connected, send message directly
      sendMessage(JSON.stringify(data));
    } else if (readyState === 0 || readyState === 2) {
      // Not connected, wait for the connection to be established
      getWebSocket().addEventListener("open", () => {
        sendMessage(JSON.stringify(data));
      });
    } else if (readyState === 3) {
      // Closed, reconnect and send message
      getWebSocket().close();
      getWebSocket().addEventListener("open", () => {
        sendMessage(JSON.stringify(data));
      });
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/"}>Home</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={"/cancellationBar"}>Cancellation</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={"/cancellationBar"}>BarChart</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3}>Cancellation Data Analyze (BarChart)</Title>

      {/* Chart */}
      <BarChart
        data={chartData}
        series={[{ type: "bar" }, { type: "bar" }, { type: "bar" }]}
      />

      <Space direction="vertical">
        {/* Stats Bar */}
        <StatsBar data={statsBarData} />

        <Space wrap align="baseline">
          <Space direction="vertical">
            {/* Date Picker */}
            <RangePicker
              value={dates || value}
              disabledDate={disabledDate}
              onCalendarChange={(val) => setDates(val)}
              onChange={onChangeRangePicker}
              onOpenChange={onOpenChange}
              picker="month"
            />

            {/* Buttons */}
            <Button onClick={onClickSubmit}>Submit Date</Button>
          </Space>

          {/* Switch for daily/monthly */}
          <Switch
            checkedChildren="Daily"
            unCheckedChildren="Monthly"
            defaultChecked
            onChange={onChangeSwitch}
          />

          {/* Radio */}
          <Radio.Group onChange={onChangeRadio} value={radioValue}>
            <Space wrap align="start">
              <Radio value={1}>Rates</Radio>
              <Radio value={2}>Numbers</Radio>
            </Space>
          </Radio.Group>
        </Space>

        {/* Steps */}
        <Steps
          current={current}
          status={status}
          items={[
            {
              title: "Select date",
              description:
                "Select and submit the date, you can switch between daily and monthly view.",
            },
            {
              title: "Analyze data",
              description: "Please wait for data processing.",
            },
            {
              title: "Visualize data",
              description:
                "Visualize different data using the Rate and Numbers options.",
            },
          ]}
        />
      </Space>
      {/* <p>startDate message: {startDate}</p>
      <p>endDate message: {endDate}</p>
      <p>Last message: {lastMessage?.data}</p>
      <p>type: {typeof(lastMessage?.data)}</p> */}
    </div>
  );
};

export default CancellationBar;
