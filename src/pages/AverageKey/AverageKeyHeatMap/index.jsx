import React, { useState, useEffect } from 'react'
import { Breadcrumb, DatePicker, Radio, Steps} from 'antd'
import { Link } from 'react-router-dom'
import HeatMap from '../../../components/Charts/Heatmap'
import useWebSocket from 'react-use-websocket'

const { RangePicker } = DatePicker;
const dayjs = require('dayjs')

const AverageKeyHeatMap = () => {
  // Websocket connection
  const { sendMessage, lastMessage } = useWebSocket('wss://50heid0mqj.execute-api.eu-west-1.amazonaws.com/production');

  // State variables
  //Range/Date picker State
  const [date, setDate] = useState('2020-01');

  // //Radio State
  // const [radioValue, setRadioValue] = useState(1);

  //Chart State
  const [chartData, setChartData] = useState([[],[]]);
  const [chartMax, setChartMax] = useState(1);


  //Steps State
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState('process');


  useEffect(() => {
    if (lastMessage) {
      setCurrent(2);
    }
  }, [lastMessage]);
  
  // const onChangeRadio = (e) => {
  //   console.log('radio checked', e.target.value);
  //   setRadioValue(e.target.value);
  // };

  const onChangeDatePicker = (date, dateString) => {
    setCurrent(0);
    setStatus('process');
    setDate(dateString)
    // console.log(date, dateString);
  }

  // Compile the date and action into a massage and send it to the backend
  const onClickSubmit = () => {
    const startDate = dayjs(date).startOf('month').format('YYYY-MM-DD') + ' T00:00:00';
    const endDate = dayjs(date).endOf('month').format('YYYY-MM-DD') + ' T23:59:59';
    console.log(startDate, endDate);
    const data = { "action": 'averageKeysDaily', "startDate": startDate, "endDate": endDate }
    setCurrent(1);
    setStatus('process');
    sendMessage(JSON.stringify(data))
  }

  // Parse the data from the last message and set the chart data
  const onClickVisualize = () => {
    try {

        const data = JSON.parse(lastMessage?.data).month
        
        // if (radioValue === 1) {
        //   setChartMax(1)
        // } else if (radioValue === 2) {
        //   setChartMax(100)
        // }
        setChartMax(200)
        
        if(data.length === 0) {
            setChartData([])
          } else {
            setChartData(data)
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
            <Link to={'/averageKey'}>Average Key</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
            <Link to={'/averageKeyHeatMap'}>Average Key HeatMap</Link>
            </Breadcrumb.Item>

      </Breadcrumb>

      <p>Average Key HeatMap</p>
      
      {/* Chart */}
      <HeatMap data = {chartData} range = {date} max = {chartMax} tooltip = {[0,1]}/>

      {/* Date Picker */}
      <DatePicker onChange={onChangeDatePicker} picker="month" />

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

    <p>startDate message: {date}</p>
    <p>Last message: {lastMessage?.data}</p>
    <p>type: {typeof(lastMessage?.data)}</p>
    <p>Last message id: </p>

      
    </div>
  )
}

export default AverageKeyHeatMap