import React from 'react'
import { Breadcrumb,  DatePicker, Space } from 'antd'
import { Link } from 'react-router-dom'
import StatsBar from './StatsBar';
import useWebSocket from 'react-use-websocket';

const Home = () => {
  const { sendMessage, lastMessage } = useWebSocket('wss://50heid0mqj.execute-api.eu-west-1.amazonaws.com/production');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const onChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0] + 'T00:00:00');
    setEndDate(dateStrings[1] + 'T00:00:00');
  }

  const onClick = () => {
    const data = { "action": "getCancellationData", "startDate": startDate, "endDate": endDate }
    sendMessage(JSON.stringify(data))
  }

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
        <StatsBar/>
        <DatePicker.RangePicker picker="month" onChange={onChange} />
        <button>
          day data
        </button>
        <button>
          mounth data
        </button>
         <button onClick={() => sendMessage('{"action": "getCancellationData", "startDate": "2023-01-01T00:00:00", "endDate": "2023-02-01T00:00:00"}')}>Send Message</button> 
        <p>Last message: {lastMessage?.data}</p>
        <p>startDate message: {startDate}</p>
        <p>endDate message: {endDate}</p>


      </Space>
    </div>
  )
}

export default Home



