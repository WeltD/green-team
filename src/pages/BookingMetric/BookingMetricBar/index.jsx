import React, { useState, useEffect } from 'react'
import { Breadcrumb, DatePicker, Switch, Radio, Steps} from 'antd'
import { Link } from 'react-router-dom'
import BarChart from '../../../components/Charts/BarChart'
import StatsBar from '../../../components/StatsBar'

import useWebSocket from 'react-use-websocket'

const { RangePicker } = DatePicker;

const BookingMetricBar = () => {
  // Websocket connection
  const { sendMessage, lastMessage } = useWebSocket('wss://50heid0mqj.execute-api.eu-west-1.amazonaws.com/production');

  // State variables
  //Range/Date picker State
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [range, setRange] = useState(1);

//   //Radio State
//   const [radioValue, setRadioValue] = useState(1);

  //Websocket connection State
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [massageAction, setMassageAction] = useState('bookingMetricsDaily');

  //Chart State
  const [chartData, setChartData] = useState([[],[]]);

  //StatsBar State
  const [statsBarData, setStatsBarData] = useState([[],[]]);

  //Steps State
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState('process');


  useEffect(() => {
    if (lastMessage) {
      setCurrent(2);
    }
  }, [lastMessage]);
  

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > range;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > range;
    return !!tooEarly || !!tooLate;
  };

  
  const onOpenChange = (open) => {
    setCurrent(0);
    setStatus('process');
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const onChangeSwitch = (checked) => {
    setValue(null);
    setChartData([]);
    setCurrent(0);
    setStartDate(null);
    setEndDate(null);
    setStatus('process');
    if(checked){
      setRange(1);
      setMassageAction('bookingMetricsDaily');
    } else {
      setRange(32);
      setMassageAction('bookingMetricsMonthly');
    }
  };

//   const onChangeRadio = (e) => {
//     console.log('radio checked', e.target.value);
//     setRadioValue(e.target.value);
//   };

  const onChangeRangePicker = (dates) => {
    setStartDate(dates[0].startOf('month').format('YYYY-MM-DD') + ' T00:00:00');
    setEndDate(dates[1].endOf('month').format('YYYY-MM-DD') + ' T23:59:59');
    setValue(dates);
  }

  // Compile the date and action into a massage and send it to the backend
  const onClickSubmit = () => {
    const data = { "action": massageAction, "startDate": startDate, "endDate": endDate }
    setCurrent(1);
     setStatus('process');
    sendMessage(JSON.stringify(data))
  }

  // Parse the data from the last message and set the chart data
  const onClickVisualize = () => {
    try {
      if(massageAction === 'bookingMetricsDaily'){

        const data = JSON.parse(lastMessage?.data).dates
        const data2 = JSON.parse(lastMessage?.data).total

        if(data.length === 0) {
          setChartData([])
          setStatsBarData([[],[]])
        } else {
          setChartData(data)
          setStatsBarData(data2)
        }
      }
      else {
      
        const data = JSON.parse(lastMessage?.data).months
        const data2 = JSON.parse(lastMessage?.data).total

        if(data.length === 0) {
          setChartData([])
          setStatsBarData([[],[]])
        } else {
          setChartData(data)
          setStatsBarData(data2)
        }

      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
         style={{
              margin: '16px 0',
        }}
      >
            <Breadcrumb.Item>
              <Link to={'/'}>Home</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
            <Link to={'/bookingMetric'}>Booking Metric</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
            <Link to={'/bookingMetricBar'}>BarChart</Link>
            </Breadcrumb.Item>

      </Breadcrumb>

      <p>Booking Metric Bar Chart</p>
      
      {/* Chart */}
      <BarChart data = {chartData} series = {[{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]}/>

      {/* StatsBar */}
      <StatsBar data = {statsBarData} />

      {/* Date Picker */}
    <RangePicker
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={onChangeRangePicker}
      onOpenChange={onOpenChange}
      picker="month"
    />

    {/* Switch for daily/monthly */}
    <Switch defaultChecked onChange={onChangeSwitch} />

    {/* Buttons */}
    <button onClick={onClickSubmit}>Send Message</button> 
    <button onClick={onClickVisualize}>Visualize</button> 

    {/* Radio
    <Radio.Group onChange={onChangeRadio} value={radioValue}>
        <Radio value={1}>Rates</Radio>
        <Radio value={2}>Numbers</Radio>
    </Radio.Group> */}


    {/* Steps */}
    <Steps
      current={current}
      status= {status}
      items={[
        {
          title: 'Select date',  
        },
        {
          title: 'Analyze data',  
        },
        {
          title: 'Visualize data',          
        },
      ]}
    />

    <p>startDate message: {startDate}</p>
    <p>endDate message: {endDate}</p>
    <p>Last message: {lastMessage?.data}</p>
    <p>type: {typeof(lastMessage?.data)}</p>
    <p>Last message id: </p>

      
    </div>
  )
}

export default BookingMetricBar