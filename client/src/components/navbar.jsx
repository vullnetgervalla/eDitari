import React, { useState } from 'react';
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
		const permissions = capabilities.findIndex((item) => location.pathname.includes(item.capability_name));
		if (permissions === -1) return false;
		return true;
	};
	const navigate = useNavigate();
	const [title, setTitle] = useState('home');
	const [openKeys, setOpenKeys] = useState([]);
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
	if (loading) {
		return (
			<Spin
				className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				size='large'
			/>
		);
	}
	if (!getPermissions()) return <div>Not allowed</div>;
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
					paddingTop: '10px',
				}}
			>
				<div className='demo-logo-vertical' />
				<Menu
					theme='dark'
					defaultSelectedKeys={['0']}
					mode='inline'
					openKeys={openKeys}
					onOpenChange={onOpenChange}
					items={items(t)}
					onClick={({ key }) => {
						const route = keyToPath[`${key}`];
						if (route) {
							setTitle(t(route));
							if (route === 'home') navigate('/');
							else {
								navigate('/' + route);
							}
						}
					}}
				/>
				<Tooltip title={t('logout')}>
					<Button
						type='primary'
						style={{
							position: 'absolute',
							bottom: 0,
							marginBottom: 20,
							width: '100px',
							height: '35px',
							left: '50%',
							transform: 'translateX(-50%)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '20px',
						}}
						onClick={handleLogout}
					>
						<LogoutOutlined />
						{t('logout')}
					</Button>
				</Tooltip>
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
