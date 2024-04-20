import { useState } from 'react';
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	UserOutlined,
	NotificationOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useTranslation } from 'react-i18next';

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items = (t) => [
	getItem(t('admin'), '1', <PieChartOutlined />, [getItem(t('seeAdmin'), '2'), getItem(t('createAdmin'), '3')]),
	getItem(t('teacher'), '4', <DesktopOutlined />, [getItem(t('seeTeacher'), '5'), getItem(t('createTeacher'), '6')]),
	getItem(t('student'), '7', <UserOutlined />, [getItem(t('studentList'), '8'), getItem(t('createStudent'), '9')]),
	getItem(t('notification'), '10', <NotificationOutlined />, [getItem(t('seeNotification'), '11'), getItem(t('createNotification'), '12')]),
	getItem(t('material'), '13', <FileOutlined />, [getItem(t('seeMaterial'), '14'), getItem(t('addMaterial'), '15')]),
];

export default function Navbar({ content }) {
	const { t } = useTranslation();
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
					defaultSelectedKeys={['1']}
					mode='inline'
					items={items(t)}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
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
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>{content}</Content>
			</Layout>
		</Layout>
	);
}
