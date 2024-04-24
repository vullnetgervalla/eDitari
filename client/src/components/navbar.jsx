import { useState } from 'react';
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	UserOutlined,
	NotificationOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	HomeFilled,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
const keyToPath = {
	0: ['/admin', 'home'],
	2: ['/admin/list-admin', 'adminList'],
	3: ['/admin/create-admin', 'createAdmin'],
	5: ['/admin/list-teacher', 'teacherList'],
	6: ['/admin/create-teacher', 'createTeacher'],
	8: ['/admin/list-student', 'studentList'],
	9: ['/admin/create-student', 'createStudent'],
	11: ['/admin/notification', 'notificationList'],
	12: ['/admin/create-notification', 'createNotification'],
	14: ['/admin/list-material', 'materialList'],
	15: ['/admin/add-material', 'addMaterial'],
};
const items = (t) => [
	getItem(t('home'), '0', <HomeFilled />),
	getItem(t('admin'), '1', <PieChartOutlined />, [getItem(t('adminList'), '2'), getItem(t('createAdmin'), '3')]),
	getItem(t('teacher'), '4', <DesktopOutlined />, [getItem(t('teacherList'), '5'), getItem(t('createTeacher'), '6')]),
	getItem(t('student'), '7', <UserOutlined />, [getItem(t('studentList'), '8'), getItem(t('createStudent'), '9')]),
	getItem(t('notification'), '10', <NotificationOutlined />, [getItem(t('notificationList'), '11'), getItem(t('createNotification'), '12')]),
	getItem(t('material'), '13', <FileOutlined />, [getItem(t('materialList'), '14'), getItem(t('addMaterial'), '15')]),
];

export default function Navbar({ content }) {
	const { t } = useTranslation();
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const navigate = useNavigate();
	const [title, setTitle] = useState('home');
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
					onClick={({ key }) => {
						setTitle(t(keyToPath[key][1]));
						const path = keyToPath[key][0];
						if (path) {
							navigate(path);
						}
					}}
				/>
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
