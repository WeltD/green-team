import { Layout as AntLayout, theme, Typography, ConfigProvider, Switch } from "antd";
import { useState } from "react";

import SideMenu from "../../components/SideMenu";

const { Header, Content, Footer, Sider } = AntLayout;
const { Text } = Typography;
const {darkAlgorithm, defaultAlgorithm} = theme;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');

  function mode() {
    if (themeMode === 'dark') {
      return darkAlgorithm;
    } else {
      return defaultAlgorithm;
    }
  }

  const onChangeTheme = (checked) => {
    if(checked){
      setThemeMode('dark');
    }else{
      setThemeMode('light');
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider theme={{
      algorithm: mode(),
    }}>
      <AntLayout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          {/* 搜索栏 */}
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          ></div>
          <Switch defaultChecked onChange={onChangeTheme}/>
          <SideMenu />
        </Sider>

        <AntLayout className="site-layout">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            {children}
          </Content>

          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Bristol Airport Data Analysis System ©2023 Created by Green Team
          </Footer>
        </AntLayout>
      </AntLayout>
    </ConfigProvider>
  );
};
export default Layout;
