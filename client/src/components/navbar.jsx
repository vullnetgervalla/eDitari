import React, { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  NotificationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeFilled,
  LogoutOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Typography, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogout } from 'hooks/useLogout';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useCapabilities } from 'hooks/useCapabilities';
import { Spin } from 'antd';
import { Unauthorized } from './auth/Unauthorized';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
let keyToPath = {
  0: 'home',
};
const iconMapping = {
  home: <HomeFilled />,
  admin: <PieChartOutlined />,
  teacher: <DesktopOutlined />,
  student: <UserOutlined />,
  notification: <NotificationOutlined />,
  material: <FileOutlined />,
  roles: <PlusCircleOutlined />,
};
export default function NavBar({ content }) {
  const axiosPrivate = useAxiosPrivate();
  const { capabilities, loading } = useCapabilities(axiosPrivate);
  const logout = useLogout();
  const location = useLocation();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState(sessionStorage.getItem('title') || 'home');
  const [selectedKey, setSelectedKey] = useState(sessionStorage.getItem('selectedKey') || '0');
  const [openKeys, setOpenKeys] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const contentStyle = {
    margin: '24px 16px',
    padding: 60,
    minHeight: 280,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
    position: 'relative',
  };
  const getPermissions = () => {
    if (location.pathname == '/') return true;
    const path = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
    const permissions = capabilities.findIndex((item) => path.startsWith(`/${item.capability_name}`));
    if (permissions === -1) return false;
    return true;
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (openKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys(keys.filter((key) => key !== latestOpenKey));
    }
  };
  const items = (t) => {
    let key = 10;
    let currentCategory = capabilities[0].category_name;
    let categoryCounter = 0;
    capabilities.forEach((item) => {
      if (item.category_name !== currentCategory) {
        key += 10;
        currentCategory = item.category_name;
        categoryCounter = 0;
      }
      categoryCounter++;
      keyToPath[key + categoryCounter] = item.capability_name;
    });
    const groupedCapabilities = capabilities.reduce((groups, item) => {
      const group = groups[item.category_name] || [];
      group.push(item.capability_name);
      groups[item.category_name] = group;
      return groups;
    }, {});
    const allItems = Object.entries(groupedCapabilities).map(([category, items], index) => {
      const subItems = items.map((capability_name, subIndex) => getItem(t(capability_name), `${index + 1}${subIndex + 1}`));
      return getItem(t(category), `${index + 1}`, iconMapping[category], subItems);
    });
    allItems.unshift(getItem(t('home'), '0', iconMapping['home']));
    return allItems;
  };
  useEffect(() => {
    sessionStorage.setItem('title', title);
    sessionStorage.setItem('selectedKey', selectedKey);
  }, [title, selectedKey]);
  if (loading) {
    return (
      <Spin
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        size='large'
      />
    );
  }
  if (!getPermissions()) return <Unauthorized />;
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: '100vh',
          paddingTop: '10px',
          position: 'sticky',
          top: 0,
          float: 'left',
        }}
      >
        <div className='demo-logo-vertical' >
          {/* Logo here */}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 'calc(100vh - 15px)',
          }}>

          <Menu
            theme='dark'
            defaultSelectedKeys={[selectedKey]}
            mode='inline'
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items(t)}
            onClick={({ key }) => {
              const route = keyToPath[`${key}`];
              if (route) {
                setTitle(route);
                setSelectedKey(key);
              if (route === 'home') navigate('/');
                else {
                  navigate('/' + route);
                }
              }
            }}
          />
          <Menu 
            theme='dark'
            mode='inline'
            // style={{ position: 'sticky', bottom: 0, width: '100%' }}
          >
            <Menu.Item
              key='1'
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              {t('logout')}
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Title
            style={{ margin: 0, paddingLeft: 10 }}
            level={3}
          >
            {t(title)}
          </Title>
        </Header>
        <Content style={contentStyle}>{content}</Content>
      </Layout>
    </Layout>
  );
}
