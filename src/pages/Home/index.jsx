import React, { useState } from 'react'
import { Breadcrumb,  DatePicker  , Space } from 'antd'
import { Link } from 'react-router-dom'
import StatsBar from '../../components/StatsBar'
import useWebSocket from 'react-use-websocket';

const { RangePicker } = DatePicker;

const Home = () => {
  const { sendMessage, lastMessage } = useWebSocket('wss://50heid0mqj.execute-api.eu-west-1.amazonaws.com/production');

  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const range = 40;

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

  return (
    <div>
    <Breadcrumb
         style={{
              margin: '16px 0',
        }}
      >
      <Breadcrumb.Item>
        <Link to={'/'}>Home</Link>
      </Breadcrumb.Item>
    </Breadcrumb>

      <Space direction="vertical" size={12}>
        <StatsBar data = {[]}/>
        <RangePicker
          picker = "month"
          value={dates || value}
          disabledDate={disabledDate}
          onCalendarChange={(val) => setDates(val)}
          onChange={(val) => setValue(val)}
          onOpenChange={onOpenChange}
        />
        <button>
          day data
        </button>
        <button>
          mounth data
        </button>
         <button onClick={() => sendMessage('{"action": "getCancellationData", "startDate": "2023-01-01T00:00:00", "endDate": "2023-02-01T00:00:00"}')}>Send Message</button> 
        <p>Last message: {lastMessage?.data}</p>
        {/* <p>startDate message: {startDate}</p>
        <p>endDate message: {endDate}</p> */}


      </Space>
    </div>
  )
}

export default Home



