import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
function ActiveUsers() {
	const { t } = useTranslation();
	return (
		<>
			<Row gutter={16}>
				<Col span={8}>
					<Statistic
						title={t('number.students')}
						value={112893}
					/>
				</Col>
				<Col span={8}>
					<Statistic
						title={t('number.teachers')}
						value={112893}
					/>
        </Col>
        <Col span={8}>
					<Statistic
						title={t('number.parents')}
						value={112893}
					/>
        </Col>
      </Row>
		</>
	);
}
export default ActiveUsers;
