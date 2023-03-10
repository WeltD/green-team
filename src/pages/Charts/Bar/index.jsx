import React, { useState, useEffect } from 'react'
import { Breadcrumb, DatePicker, Switch} from 'antd'
import { Link } from 'react-router-dom'
import BarChart from '../../../components/Charts/BarChart'

import useWebSocket from 'react-use-websocket'

const { RangePicker } = DatePicker;

const Bar = () => {
  const { sendMessage, lastMessage } = useWebSocket('wss://50heid0mqj.execute-api.eu-west-1.amazonaws.com/production');
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [range, setRange] = useState(20);
  const [chartData, setChartData] = useState([]);
  const [massageAction, setMassageAction] = useState('cancellationDaily');
  const [lastMessageId, setLastMessageId] = useState(0);

  useEffect(() => {
    if (lastMessage) {
      setLastMessageId(lastMessageId + 1)
      console.log(lastMessageId)
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
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const onChangeSwitch = (checked) => {
    setValue(null);
    setChartData([]);
    if(checked){
      setRange(20);
      setMassageAction('cancellationDaily');
    } else {
      setRange(40);
      setMassageAction('cancellationMonthly');
    }
  };

  const onChangeRangePicker = (dates) => {
    setStartDate(dates[0].startOf('month').format('YYYY-MM-DD') + ' T00:00:00');
    setEndDate(dates[1].endOf('month').format('YYYY-MM-DD') + ' T23:59:59');
    setValue(dates);
  }

  // Compile the date and action into a massage and send it to the backend
  const onClickSubmit = () => {
    const data = { "action": massageAction, "startDate": startDate, "endDate": endDate }
    sendMessage(JSON.stringify(data))
  }

  // Parse the data from the last message and set the chart data
  const onClickVisualize = () => {
    try {
      if(massageAction == 'cancellationDaily'){
        const data = JSON.parse(lastMessage?.data).datesCancelled

        if(data.length == 0) {
          setChartData([])
        } else {
          setChartData(data)
        }
      }
      else {
        const data = JSON.parse(lastMessage?.data).monthsCancelled
        if(data.length == 0) {
          setChartData([])
        } else {
          setChartData(data)
        }
      }
    } catch (error) {
      console.log(error)
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
            <Link to={'/barchart'}>BarChart</Link>
            </Breadcrumb.Item>

      </Breadcrumb>

      {/* Chart */}
      <BarChart data = {chartData}/>

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

    <p>startDate message: {startDate}</p>
    <p>endDate message: {endDate}</p>
    <p>Last message: {lastMessage?.data}</p>
    <p>type: {typeof(lastMessage?.data)}</p>
    <p>Last message id: </p>

      
    </div>
  )
}

export default Bar