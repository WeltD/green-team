option = {
  
    dataset: {
      source: [
      [ "Date", "Cancelled bookings made on a given date", "Cancelled bookings started on a given date", "Cancelled bookings ended on a given date" ],
      [ "2022-12-01", 11, 12, 21 ],
      [ "2022-12-02", 18, 15, 27 ],
      [ "2022-12-03", 10, 23, 16 ],
      ]
    },
    
     calendar: [{
         left: 'center',
         top: 'middle',
         cellSize: [70, 70],
         yearLabel: {show:false},
         orient:'vertical',
         dayLabel:{
             firstDay :1,
             nameMap:['周日','周一','周二','周三','周四','周五','周六']
         },
         monthLabel:{
             show:false
         },
        range:'2022-12'
     }],
    
    
    
    tooltip: {
      formatter: function(params) {
        return 'Date: ' + params.name + '<br/>' +
               'Cancelled bookings made on a given date: ' + params.data[1] + '<br/>' +
               'Cancelled bookings started on a given date: ' + params.data[2] + '<br/>' +
               'Cancelled bookings ended on a given date: ' + params.data[3];
      }
    },
    
    visualMap: {
      min: 0,
      max: 30,
      orient: 'horizontal',
      left: 'center',
      bottom: '10%'
    },
    
    series: {
      type: 'heatmap',
      coordinateSystem:'calendar',
    },
  
  };


      // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.


const cancelledBookingsMade = [];
const cancelledBookingsStarted = [];
const cancelledBookingsEnded = [];

// Loop through the original data, starting at index 1 to skip the header row
for (let i = 1; i < originalData.length; i++) {
  const row = originalData[i];

  // Push a new array containing the date and the number of cancelled bookings made on that date
  cancelledBookingsMade.push([row[0], row[1]]);

  // Push a new array containing the date and the number of cancelled bookings started on that date
  cancelledBookingsStarted.push([row[0], row[2]]);

  // Push a new array containing the date and the number of cancelled bookings ended on that date
  cancelledBookingsEnded.push([row[0], row[3]]);
}

// Create a new array containing the transformed data
const transformedData = [cancelledBookingsMade, cancelledBookingsStarted, cancelledBookingsEnded];