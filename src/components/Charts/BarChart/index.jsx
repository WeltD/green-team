import React from 'react'
import ReactEcharts from "echarts-for-react";

const BarChart = (props) => {
  
  const option = {
    legend: {},
          tooltip: {},
          dataset: {
              source: props.data
          },
      
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  };

  return (
    //show the chart
    <div>
      <div>
        <ReactEcharts option={option} />
      </div>
    </div>
  )
}

export default BarChart;