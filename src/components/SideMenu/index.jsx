import { AppstoreOutlined, MailOutlined, CalendarOutlined, SettingOutlined, LinkOutlined } from '@ant-design/icons';
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
  getItem('Home', 'home', <MailOutlined />),
  getItem('Chart', 'chart', <AppstoreOutlined />, [
    getItem('BarChart', 'barchart'),
    getItem('PieChart', 'piechart'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Average Delay', 'average delay', <AppstoreOutlined />, [
    getItem('BarChart', 'averageDelayBar'),
    getItem('Heat Map', 'averageDelayHeatMap'),
  ]),
  getItem('Average Key', 'average key', <AppstoreOutlined />, [
    getItem('BarChart', 'averageKeyBar'),
    getItem('Heat Map', 'averageKeyHeatMap'),
  ]),
  getItem('Booking', 'booking', <AppstoreOutlined />, [
    getItem('BarChart', 'bookingMetricBar'),
    getItem('Heat Map', 'bookingMetricHeatMap'),
  ]),
  getItem('Cancellation', 'cancellation', <AppstoreOutlined />,  [
    getItem('BarChart', 'cancellationBar'),
    getItem('Heat Map', 'cancellationHeatMap'),
  ]),
  getItem('InAdvance', 'in advance', <AppstoreOutlined />,  [
    getItem('BarChart', 'inAdvanceBar'),
    getItem('Heat Map', 'inAdvanceHeatMap'),
  ]),
];

const SideMenu = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState('inline');

  const [theme, setTheme] = useState('light');

  const changeMode = (value) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    console.log('click ', e);
    navigate('/'+e.key);
  };

  
  return (
    <>

      {/* <div style={{color : 'black'}}>
        <Switch onChange={changeMode} /> Change Mode
      </div> */}

      <Divider/>

      <Switch onChange={changeTheme} /> Change Style

      <br />
      <br />

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