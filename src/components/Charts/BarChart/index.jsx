import React from "react";
import ReactEcharts from "echarts-for-react";

const BarChart = (props) => {
  const option = {
    legend: {
      textStyle:{
        color: 'grey'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    dataset: {
      source: props.data,
    },
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
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: props.series,
  };

  return (
    //show the chart
    <div>
      <ReactEcharts option={option} notMerge={true} />
    </div>
  );
};

export default BarChart;
