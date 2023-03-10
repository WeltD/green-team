import React from 'react'
import ReactEcharts from "echarts-for-react";

const HeatMap = (props) => {
   const option = {
        title: {
          top: 30,
          left: 'center',
          text: 'Daily Step Count'
        },
        tooltip: {},
        visualMap: {
          min: 0,
          max: 100,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          top: 65
        },
        calendar: {
          top: 120,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: props.range,
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: false }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: props.data
        }
      };

  return (
    <div>
      <div>
        <ReactEcharts option={option} />
      </div>
    </div>
  )
}

export default HeatMap