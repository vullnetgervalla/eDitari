import { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Administratorët', '1', <PieChartOutlined />, [
    getItem('Shiko administratorët', '2'),
    getItem('Krijo administratorë', '3'),
  ]),
  getItem('Mësuesit', '4', <DesktopOutlined />, [
    getItem('Shiko mësuesit', '5'),
    getItem('Krijo mësues', '6'),
  ]),
  getItem('Nxënësit', '7', <UserOutlined />, [
    getItem('Lista e nxënësve', '8'),
    getItem('Regjistro nxënës', '9'),
  ]),
  getItem('Njoftimet', '10', <NotificationOutlined />, [
    getItem('Shiko njoftimet', '11'),
    getItem('Krijo njoftim', '12'),
  
  ]),
  getItem('Materialet', '13', <FileOutlined />),
];

export default function Navbar () {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{paddingTop: '20px',}}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}