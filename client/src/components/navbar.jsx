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
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Typography, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogout } from 'hooks/useLogout';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children ) {
	return {
		key,
		icon,
		children,
		label,
	};
}	
const keyToPath = {
	0: ['/', 'home'],
	11: ['/list-admin', 'adminList'],
	12: ['/create-admin', 'createAdmin'],
	21: ['/list-teacher', 'teacherList'],
	22: ['/create-teacher', 'createTeacher'],
	31: ['/list-student', 'studentList'],
	32: ['/create-student', 'createStudent'],
	41: ['/notification', 'notificationList'],
	42: ['/create-notification', 'createNotification'],
	51: ['/list-material', 'materialList'],
	52: ['/add-material', 'addMaterial'],
};
const ACCESS_CONFIG = {
	ADMIN: ['0', '11', '12', '21', '22', '31', '32', '41', '42', '51', '52'],
	TEACHER: ['0', '31', '32', '41', '42', '51', '52'],
	STUDENT: ['0', '41', '42', '51', '52'],
};

export default function NavBar({ content, userType }) {
	const logout = useLogout();
	const { t } = useTranslation();
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
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
	const accessibleRoutes = Object.fromEntries(
		Object.entries(keyToPath)
			.filter(([key]) => (ACCESS_CONFIG[userType] || []).includes(key))
			.map(([key, value]) => [key, { path: value[0], name: value[1] }])
	);
	const items = (t) => {
		const allItems = [
			getItem(t('home'), '0', <HomeFilled />),
			getItem(t('admin'), '1', <PieChartOutlined />, [getItem(t('adminList'), '11'), getItem(t('createAdmin'), '12')]),
			getItem(t('teacher'), '2', <DesktopOutlined />, [getItem(t('teacherList'), '21'), getItem(t('createTeacher'), '22')]),
			getItem(t('student'), '3', <UserOutlined />, [getItem(t('studentList'), '31'), getItem(t('createStudent'), '32')]),
			getItem(t('notification'), '4', <NotificationOutlined />, [getItem(t('notificationList'), '41'), getItem(t('createNotification'), '42')]),
			getItem(t('material'), '5', <FileOutlined />, [getItem(t('materialList'), '51'), getItem(t('addMaterial'), '52')]),
		];
		if (userType === 'ADMIN') {
			return allItems;
		} else if (userType === 'TEACHER') {
			return allItems.filter((item) => !['1', '2'].includes(item.key));
		} else {
			return allItems.filter((item) => ['0', '4', '5'].includes(item.key));
		}
	};

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
						const route = accessibleRoutes[key];
						if (route) {
							setTitle(t(route.name));
							const path = route.path;
							if (path) {
								navigate(path);
							}
						} else {
							console.error(`No route at key ${key}`);
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
				<Content
					style={{
						// display:flex,
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					{content}
				</Content>
			</Layout>
		</Layout>
	);
}
