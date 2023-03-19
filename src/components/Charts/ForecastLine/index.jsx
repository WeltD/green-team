import React from 'react'
import ReactEcharts from "echarts-for-react";

const ForecastLine = (props) => {
  
   const option = {
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        toolbox: {
          show: true,
          orient: 'vertical',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: props.series
      };

  return (
    //show the chart
      <div>
        <ReactEcharts option={option}  notMerge = {true}/>
      </div>
  )
}

export default ForecastLine;