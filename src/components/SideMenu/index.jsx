import { AppstoreOutlined, HomeOutlined, BarChartOutlined, CalendarOutlined } from '@ant-design/icons';
import { Divider, Menu, Switch} from 'antd';
import { useNavigate,} from 'react-router-dom'
import { useState } from 'react';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', 'home', <HomeOutlined />),
  // getItem('Chart', 'chart', <AppstoreOutlined />, [
  //   getItem('BarChart', 'barchart', ),
  //   getItem('PieChart', 'piechart'),
  //   getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  // ]),
  getItem('Flight Delay', 'average delay', <AppstoreOutlined />, [
    getItem('Historical', 'averageDelayHistorical', <BarChartOutlined />),
    getItem('Heat Map', 'averageDelayHeatMap', <CalendarOutlined />),
  ]),
  getItem('Number of Cars', 'average key', <AppstoreOutlined />, [
    getItem('Historical', 'averageKeyHistorical', <BarChartOutlined />),
    getItem('Heat Map', 'averageKeyHeatMap', <CalendarOutlined />),
  ]),
  getItem('Booking', 'booking', <AppstoreOutlined />, [
    getItem('Historical', 'bookingMetricHistorical', <BarChartOutlined />),
    getItem('Forecast', 'bookingMetricForecast', <CalendarOutlined />),
    getItem('Heat Map', 'bookingMetricHeatMap', <CalendarOutlined /> ),
  ]),
  getItem('Cancellation', 'cancellation', <AppstoreOutlined />,  [
    getItem('Historical', 'cancellationHistorical', <BarChartOutlined />),
    getItem('Forecast', 'cancellationForcast', <CalendarOutlined />),
    getItem('Heat Map', 'cancellationHeatMap', <CalendarOutlined />),
  ]),
  getItem('In Advance', 'in advance', <AppstoreOutlined />,  [
    getItem('Historical', 'inAdvanceHistorical', <BarChartOutlined />),
    getItem('Heat Map', 'inAdvanceHeatMap', <CalendarOutlined />),
  ]),
  getItem('Stay Durations', 'stay', <AppstoreOutlined />,  [
    getItem('Historical', 'stayHistorical', <BarChartOutlined />),
    getItem('Forecast', 'stayForcast', <CalendarOutlined />),
    getItem('Heat Map', 'stayHeatMap', <CalendarOutlined />),
  ]),
];

const SideMenu = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState('inline');

  const [theme, setTheme] = useState('dark');

  // // const changeMode = (value) => {
  // //   setMode(value ? 'vertical' : 'inline');
  // // };

  // // const changeTheme = (value) => {
  // //   setTheme(value ? 'dark' : 'light');
  // // };

  const onClick = (e) => {
    console.log('click ', e);
    navigate('/'+e.key);
  };

  
  return (
    <>

      {/* <div style={{color : 'black'}}>
        <Switch onChange={changeMode} /> Change Mode
      </div> */}

      {/* <Divider/> */}

      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        items={items}
        onClick={onClick}
      />
    </>
  );
};
export default SideMenu;