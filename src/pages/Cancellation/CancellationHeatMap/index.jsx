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
import CHeatMap from "./CHeatMap";
import StatsBar from "../../../components/StatsBar";
import Steps from "../../../components/Steps";

import useWebSocket from "react-use-websocket";

const dayjs = require("dayjs");
const { Title } = Typography;

const CancellationHeatMap = () => {
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
  const [date, setDate] = useState("2020-01");

  //Radio State
  const [radioValue, setRadioValue] = useState(1);

  //Chart State
  const [chartData, setChartData] = useState([]);
  const [chartMax, setChartMax] = useState(1);

  //StatsBar State
  const [statsBarData, setStatsBarData] = useState([[], []]);

  //Steps State
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("process");

  useEffect(() => {
    if (lastMessage) {
      try {
        const data =
          radioValue === 1
            ? JSON.parse(lastMessage?.data).datesRates
            : JSON.parse(lastMessage?.data).datesCancelled;
        const statsBarData =
          radioValue === 1
            ? JSON.parse(lastMessage?.data).totalRates
            : JSON.parse(lastMessage?.data).totalCancelled;
        if (radioValue === 1) {
          setChartMax(1);
        } else if (radioValue === 2) {
          setChartMax(100);
        }

        if (data.length === 0) {
          setChartData([]);
          setStatsBarData([[], []]);
        } else {
          setChartData(data);
          setStatsBarData(statsBarData);
        }
        setCurrent(2);
      } catch (error) {
        setStatus("error");
      }
    }
  }, [lastMessage]);

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
    try {
      const data =
        e.target.value === 1
          ? JSON.parse(lastMessage?.data).datesRates
          : JSON.parse(lastMessage?.data).datesCancelled;
      const statsBarData =
        e.target.value === 1
          ? JSON.parse(lastMessage?.data).totalRates
          : JSON.parse(lastMessage?.data).totalCancelled;
      if (e.target.value === 1) {
        setChartMax(1);
      } else if (e.target.value === 2) {
        setChartMax(100);
      }

      if (data.length === 0) {
        setChartData([]);
        setStatsBarData([[], []]);
      } else {
        setChartData(data);
        setStatsBarData(statsBarData);
      }
    } catch (error) {
      if (current === 2) {
        setStatus("error");
      }
    }
  };

  const onChangeDatePicker = (date, dateString) => {
    setCurrent(0);
    setStatus("process");
    setDate(dateString);
  };

  // Compile the date and action into a massage and send it to the backend
  const onClickSubmit = () => {
    const startDate =
      dayjs(date).startOf("month").format("YYYY-MM-DD") + " T00:00:00";
    const endDate =
      dayjs(date).endOf("month").format("YYYY-MM-DD") + " T23:59:59";
    console.log(startDate, endDate);
    const data = {
      action: "cancellationDaily",
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
          <Link to={"/cancellationHeatMap"}>Cancellation</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={"/cancellationHeatMap"}>HeatMap</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Content */}
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Title level={3}>Cancellation Historical HeatMap</Title>
        {/*HeatMap Card */}
        <Card
          extra={<DatePicker onChange={onChangeDatePicker} disabledDate = {disabledDate} picker="month" />}
        >
          <Space
            direction="vertical"
            style={{
              display: "flex",
            }}
          >
            {/* HeatMap */}
            <CHeatMap data={chartData} range={date} max={chartMax} />
            {/* Radio Buttons */}
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Space wrap align="start">
                <Radio value={1}>Rates</Radio>
                <Radio value={2}>Numbers</Radio>
              </Space>
            </Radio.Group>
            {/* Submit Buttons */}
            <Button onClick={onClickSubmit}>Submit Date</Button>
          </Space>
        </Card>
        {/* StatsBar */}
        <StatsBar data={statsBarData} />
        {/* Steps */}
        <Steps current={current} status={status} />

      </Space>

      {/* <p>startDate message: {date}</p>
      <p>Last message: {lastMessage?.data}</p>
      <p>type: {typeof lastMessage?.data}</p>
      <p>Last message id: </p> */}
    </div>
  );
};

export default CancellationHeatMap;
