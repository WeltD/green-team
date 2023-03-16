import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  DatePicker,
  Steps,
  Typography,
  Space,
  Button,
  Divider,
} from "antd";
import { Link } from "react-router-dom";
import IAHeatMap from "./IAHeatMap";
import StatsBar from "../../../components/StatsBar";

import useWebSocket from "react-use-websocket";

const dayjs = require("dayjs");
const { Title } = Typography;

const InAdvanceHeatMap = () => {
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

  //Chart State
  const [chartData, setChartData] = useState([[], []]);
  const [chartMax, setChartMax] = useState(75);

  //StatsBar State
  const [statsBarData, setStatsBarData] = useState([[], []]);

  //Steps State
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("process");

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage?.data).datesInAdvanceAverage;
        const statsBarData = JSON.parse(lastMessage?.data).inAdvanceAverage;

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
      action: "inAdvanceDaily",
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
          <Link to={"/inAdvanceHeatMap"}>In Advance</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={"/inAdvanceHeatMap"}>HeatMap</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3}>In Advance Data Analyze (HeatMap)</Title>
      
      <IAHeatMap data={chartData} range={date} max={chartMax} />

      <Divider />

      <Space direction="vertical">
        {/* StatsBar */}
        <StatsBar data={statsBarData} />
        <Space>
          {/* Date Picker */}
          <DatePicker onChange={onChangeDatePicker} picker="month" />

          {/* Buttons */}
          <Button onClick={onClickSubmit}>Submit Date</Button>
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
              description: "Visualize data in the chart and stats bar above.",
            },
          ]}
        />
      </Space>

      <p>startDate message: {date}</p>
      <p>Last message: {lastMessage?.data}</p>
      <p>type: {typeof lastMessage?.data}</p>
      <p>Last message id: </p>
    </div>
  );
};

export default InAdvanceHeatMap;
