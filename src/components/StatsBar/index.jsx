import React from 'react'
import { Space } from 'antd'
import StatsCard from '../StatsCard'

const StatsBar = (props) => {
  const {data} = props
  function creatBar(data) {
    try{
      return  data[0].map((item, index) => (<StatsCard label={item} number={data[1][index]} />))
    } catch (error) {
      console.log(data)
      return null
    }
  }
  return (
    <div>
    <Space size="middle" wrap>
      {
        creatBar(data)
      }
      
    </Space>
    </div>
  )
}

export default StatsBar
