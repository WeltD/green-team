import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  DatePicker,
  Radio,
  Steps,
  Typography,
  Space,
  Button,
  Divider,
} from "antd";
import { Link } from "react-router-dom";
import ForecastLine from "../../../components/Charts/ForecastLine";

import useWebSocket from "react-use-websocket";

const dayjs = require("dayjs");

const { RangePicker } = DatePicker;

const { Title } = Typography;

const BookingMetricForecast = () => {
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

  //Radio State
  const [radioValue, setRadioValue] = useState(1);

  //Websocket connection State
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  //Chart State
  const [chartSeries, setChartSeries] = useState([]);
  const [chartXaxis, setChartXaxis] = useState([]);
  const [chartTitle, setChartTitle] = useState(null);

  //Steps State
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("process");

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage?.data);

        const series = () => {
          switch (radioValue) {
            case 1:
              return data.bookingMadeForecast.forecastData;
            case 2:
              return data.bookingStartForecast.forecastData;
            case 3:
              return data.bookingEndForecast.forecastData;
            default:
              return [];
          }
        };

        const xaxis = () => {
          switch (radioValue) {
            case 1:
              return data.bookingMadeForecast.timestamps;
            case 2:
              return data.bookingStartForecast.timestamps;
            case 3:
              return data.bookingEndForecast.timestamps;
            default:
              return [];
          }
        };

        const title = () => {
          switch (radioValue) {
            case 1:
              return data.bookingMadeForecast.title;
            case 2:
              return data.bookingStartForecast.title;
            case 3:
              return data.bookingEndForecast.title;
            default:
              return [];
          }
        };

        if (data.length === 0) {
          setChartSeries([]);
          setChartXaxis([]);
          setChartTitle(null);
        } else {
          setChartSeries(series());
          setChartXaxis(xaxis());
          setChartTitle(title());
        }

        setCurrent(2);
      } catch (error) {
        setStatus("error");
      }
    }
  }, [lastMessage]);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    // Can not select days before today and today and year must in 2023

    return current && (current.year() !== 2023 || current < dayjs().endOf('day'));
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

  const onChangeRangePicker = (dates) => {
    setStartDate(dates[0].startOf("month").format("YYYY-MM-DD") + "T00:00:00");
    setEndDate(dates[1].endOf("month").format("YYYY-MM-DD") + "T23:59:59");
    setValue(dates);
  };

  const onChangeRadio = (e) => {
    setRadioValue(e.target.value);
    try {
      const data = JSON.parse(lastMessage?.data);

      const series = () => {
        switch (e.target.value) {
          case 1:
            return data.bookingMadeForecast.forecastData;
          case 2:
            return data.bookingStartForecast.forecastData;
          case 3:
            return data.bookingEndForecast.forecastData;
          default:
            return [];
        }
      };

      const xaxis = () => {
        switch (e.target.value) {
          case 1:
            return data.bookingMadeForecast.timestamps;
          case 2:
            return data.bookingStartForecast.timestamps;
          case 3:
            return data.bookingEndForecast.timestamps;
          default:
            return [];
        }
      };

      const title = () => {
        switch (e.target.value) {
          case 1:
            return data.bookingMadeForecast.title;
          case 2:
            return data.bookingStartForecast.title;
          case 3:
            return data.bookingEndForecast.title;
          default:
            return [];
        }
      };

      if (data.length === 0) {
        setChartSeries([]);
        setChartXaxis([]);
        setChartTitle(null);
      } else {
        setChartSeries(series());
        setChartXaxis(xaxis());
        setChartTitle(title());
      }
    } catch (error) {
      if (current === 2) {
        setStatus("error");
      }
    }
  };

  // Compile the date and action into a massage and send it to the backend
  const onClickSubmit = () => {
    const data = {
      action: "forecastBookingMetrics",
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
          <Link to={"/averageDelayHeatMap"}>Average Delay</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={"/averageDelayHeatMap"}>HeatMap</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3}>Cancellation Data Analyze (HeatMap)</Title>

      {/* Chart */}
      <ForecastLine
        title={chartTitle}
        xAxis={chartXaxis}
        series={chartSeries}
      />

      <Divider />

      <Space direction="vertical">

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

          {/* Radio */}
          <Radio.Group onChange={onChangeRadio} value={radioValue}>
            <Space direction="vertical" wrap align="start">
              <Radio value={1}>Forecast for bookings made on a given date</Radio>
              <Radio value={2}>Forecast for bookings starting on a given date</Radio>
              <Radio value={3}>Forecast for bookings ending on a given date</Radio>
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
      <p>startDate message: {startDate}</p>
      <p>endDate message: {endDate}</p>
      <p>Last message: {lastMessage?.data}</p>
    </div>
  );
};

export default BookingMetricForecast;
