import React from 'react'
import { Breadcrumb, DatePicker,  } from 'antd'
import { Link } from 'react-router-dom'
import PieChart from '../../../components/Charts/PieCharts'


const Pie = () => {

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const onChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  }

  function disabledDate(startDate, endDate) {
    // Can not select data range over 2 months
    return false;
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

            <Breadcrumb.Item>
            <Link to={'/piechart'}>PieChart</Link>
            </Breadcrumb.Item>

      </Breadcrumb>

      <PieChart/>

      <DatePicker.RangePicker RangePicker disabledDate={disabledDate(startDate, endDate)} picker="month" onChange={onChange} />

    </div>
  )
}

export default Pie