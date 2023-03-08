import React from 'react'
import ReactEcharts from "echarts-for-react"; 
import styles from  './index.module.css'
import example from './example.json'


const PieChart = () => {

  const months = Object.values(example.months);

  const option = {
    legend: {},
          tooltip: {},
          dataset: {
              source: months
          },
      
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  };

  return (
    //show the chart
    <div className= {styles.background}>
      <div className= {styles.pieChart}>
        <ReactEcharts option={option} />
      </div>
    </div>
  )
}

export default PieChart