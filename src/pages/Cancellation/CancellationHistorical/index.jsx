import React, { useState, useEffect } from "react";

import { Breadcrumb, Radio, Typography, Space, Button, Card } from "antd";
import RangeSelector from "../../../components/RangeSelector";
import Steps from "../../../components/Steps";
import DataSetChart from "../../../components/Charts/DataSetChart";
import StatsBar from "../../../components/StatsBar";

import { Link } from "react-router-dom";
import useWebSocket from "react-use-websocket";

const { Title } = Typography;


const CancellationHistorical = () => {
  // Websocket connection
  const { readyState, getWebSocket, sendMessage, lastMessage } = useWebSocket(
    "wss://50heid0mqj.execute-api.eu-west-1.amazonaws.com/production",
    {
      reconnectAttempts: 100,
      reconnectInterval: 3000,
    }
  );

  // State variables
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
        setCurrent(2);
      } catch (error) {
        setStatus("error");
      }
    }
  }, [lastMessage]);

  const switchAct = (checked) => {
    setChartData([]);
    setStatsBarData([[], []]);
    setCurrent(0);
    setStartDate(null);
    setEndDate(null);
    setStatus("process");
    if (checked) {
      setMassageAction("cancellationDaily");
    } else {
      setMassageAction("cancellationMonthly");
    }
  };

  const openAct = (open) => {
    setCurrent(0);
    setStatus("process");
  };

  const changeAct = (dates) => {
    setStartDate(dates[0].startOf("month").format("YYYY-MM-DD") + " T00:00:00");
    setEndDate(dates[1].endOf("month").format("YYYY-MM-DD") + " T23:59:59");
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
          <Link to={"/cancellationHistorical"}>Cancellation</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={"/cancellationHistorical"}>Historical</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        {/* Content */}
        <Title level={3}>Cancellation Historical Data Analysis</Title>

        <Card
          extra={
            <RangeSelector
              switchAct={switchAct}
              openAct={openAct}
              changeAct={changeAct}
            />
          }
        >
          <DataSetChart
            data={chartData}
            series={[{ type: "bar" }, { type: "bar" }, { type: "bar" }]}
          />
          <Space direction="vertical">
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Space wrap align="start">
                <Radio value={1}>Rates</Radio>
                <Radio value={2}>Numbers</Radio>
              </Space>
            </Radio.Group>

            {/* Buttons */}
            <Button onClick={onClickSubmit}>Submit Date</Button>
          </Space>
        </Card>
        <StatsBar data={statsBarData} />
        {/* Steps */}
        <Steps current={current} status={status} />
      </Space>

      {/* <p>startDate message: {startDate}</p>
      <p>endDate message: {endDate}</p>
      <p>Last message: {lastMessage?.data}</p>
      <p>type: {typeof lastMessage?.data}</p> */}
    </div>
  );
};

export default CancellationHistorical;
