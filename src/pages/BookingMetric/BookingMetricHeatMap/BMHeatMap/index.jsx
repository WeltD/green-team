import React from "react";
import ReactEcharts from "echarts-for-react";

const BMHeatMap = (props) => {
  function transformData(data) {
    if (data.length === 0) {
      return [
        [["Date", "Bookings made on a given date",]],
        [["Date", "Bookings started on a given date",]],
        [["Date", "Bookings ended on a given date"]],
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
          borderWidth: 0.5,
        },
        dayLabel: {
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
    },

    color: "rgb(255,100,100)",

    legend: {
      top: "bottom",
      selectedMode: "single",
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
        name: "Bookings made on a given date",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: transformedData[0],
      },
      {
        name: "Bookings started on a given date",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: transformedData[1],
      },
      {
        name: "Bookings ended on a given date",
        type: "heatmap",
        coordinateSystem: "calendar",
        data: transformedData[2],
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

export default BMHeatMap;