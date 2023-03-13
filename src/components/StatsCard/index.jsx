import React from 'react'
import { Card,  Statistic } from 'antd'

const StatsCard = (props) => {

    const {label, number} = props

  return (
    <Card bordered={false} style={{ width: 300 }}>
        <Statistic title={label} value={number} />
    </Card>
  )
}

export default StatsCard