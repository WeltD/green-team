import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  DatePicker,
  Radio,
  Typography,
  Space,
  Button,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import ObjectChart from "../../../components/Charts/ObjectChart";
import Steps from "../../../components/Steps";

import useWebSocket from "react-use-websocket";

const dayjs = require("dayjs");

const { RangePicker } = DatePicker;

const { Title } = Typography;

const StayForecast = () => {
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
        //   case 3:
        //     return data.bookingEndForecast.forecastData;
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
      action: "forecastStay",
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
          <Link to={"/stayForecast"}>Stay</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={"/stayForecast"}>Forecast</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Title level={3}>Stay Data Forecast</Title>
        <Card
          extra={
            <RangePicker
              value={dates || value}
              disabledDate={disabledDate}
              onCalendarChange={(val) => setDates(val)}
              onChange={onChangeRangePicker}
              onOpenChange={onOpenChange}
              picker="month"
            />
          }
        >
          {/* Chart */}
          <ObjectChart
            title={chartTitle}
            xAxis={chartXaxis}
            series={chartSeries}
          />

          <Space direction="vertical">
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Space wrap>
                <Radio value={1}>
                Forecast of average stay for bookings made on a given date (in days)
                </Radio>
                <Radio value={2}>
                Forecast of average stay for bookings starting on a given date (in days)
                </Radio>
              </Space>
            </Radio.Group>
            {/* Buttons */}
            <Button onClick={onClickSubmit}>Submit Date</Button>
          </Space>
        </Card>
        <Steps current={current} status={status} />
      </Space>
      {/* <p>startDate message: {startDate}</p>
      <p>endDate message: {endDate}</p>
      <p>Last message: {lastMessage?.data}</p> */}
    </div>
  );
};

export default StayForecast;
