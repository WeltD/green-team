import React from "react";
import ReactEcharts from "echarts-for-react";

const HeatMap = (props) => {
  const option = {
    dataset: {
      source: props.data,
    },

    calendar: [
      {
        cellSize: ["auto", "auto"],
        orient: "vertical",
        itemStyle: {
          color: "rgba(128, 128, 128, 0.1)",
          borderWidth: 0.5,
        },
        dayLabel: {
          color: 'grey',
          margin: 20,
          firstDay: 1,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        monthLabel: {
          show: false
        },
        yearLabel: { show: false },

        range: props.range,
      },
    ],

    tooltip: {},

    visualMap: {
      min: 0,
      max: props.max,
      calculable: true,
      textStyle:{
        color: 'grey'
      },
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: 'left',
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {}
      }
    },
    // Declare several HeatMap, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        encode: {
          tooltip: props.tooltip,
        },
      },
    ],
  };

  return (
    <div>
      <div>
        <ReactEcharts option={option} />
      </div>
    </div>
  );
};

export default HeatMap;
