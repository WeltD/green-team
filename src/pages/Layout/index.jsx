import { Layout as AntLayout, theme, Typography} from 'antd';
import { useState } from 'react';

import SideMenu from '../../components/SideMenu';

const { Header, Content, Footer, Sider } = AntLayout;
const { Text } = Typography;

const Layout = ({children}) => {

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <AntLayout
      style={{
        minHeight: '100vh',
      }}
    >

      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >

        {/* 搜索栏 */}
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
        </div>

        <SideMenu/>


      </Sider>

      <AntLayout className="site-layout">
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>

          <Title level={2}>Bristol Airport Data Analysis System</Title>

        </Header>
   */}

        <Content
          style={{
            margin: '0 16px',
          }}
        >
            {children}
            
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Bristol Airport Data Analysis System ©2023 Created by Green Team
        </Footer>

      </AntLayout>
    </AntLayout>
  );
};
export default Layout;