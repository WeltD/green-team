import React from "react";
import ReactEcharts from "echarts-for-react";

const IAHeatMap = (props) => {
  function transformData(data) {
    if (data.length === 0) {
      return [
        [
          [
            "Date",
            "Average number of days booked in advance for bookings made in time period",
          ],
        ],
        [
          [
            "Date",
            "Average number of days booked in advance for bookings started in time period",
          ],
        ],
      ];
    } else {
      const headers = data[0];
      const result = [];

      for (let i = 1; i < headers.length; i++) {
        const tempArray = [];
        for (let j = 0; j < data.length; j++) {
          if (j === 0) {
            tempArray.push([headers[0], headers[i]]);
          } else {
            tempArray.push([data[j][0], data[j][i]]);
          }
        }
        result.push(tempArray);
      }

      return result;
    }
  }

  const transformedData = transformData(props.data);

  const option = {
    calendar: [
      {
        bottom: "20%",
        left: "10%",
        cellSize: ["auto", "auto"],
        orient: "vertical",
        itemStyle: {
          color: "rgba(128, 128, 128, 0.1)",
          borderWidth: 0.5,
        },
        dayLabel: {
          color: "grey",
          margin: 20,
          firstDay: 1,
          nameMap: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        monthLabel: {
          show: false,
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
      textStyle: {
        color: "grey",
      },
    },

    color: "rgb(255,100,100)",

    legend: {
      top: "bottom",
      selectedMode: "single",
      textStyle:{
        color: 'grey'
      }
    },

    toolbox: {
      show: true,
      orient: "vertical",
      left: "left",
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    // Declare several HeatMap, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        name: "Average number of days booked in advance for bookings made in time period",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: transformedData[0],
      },
      {
        name: "Average number of days booked in advance for bookings started in time period",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: transformedData[1],
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

export default IAHeatMap;
