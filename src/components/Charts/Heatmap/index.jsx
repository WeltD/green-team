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
          borderWidth: 0.5,
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
