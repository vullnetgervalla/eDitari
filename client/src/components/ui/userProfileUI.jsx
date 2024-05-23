import React, { useState, useEffect } from 'react';
import { UserOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Flex, Card, Form, message, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const allGender = [{
    value: 'M',
    label: 'MALE',
}, {
    value: 'F',
    label: 'FEMALE'
}];

export default function UserProfileUI(props) {
    const { t } = useTranslation();
    const formData = props.formData;
    const parentFormData = props.parentFormData
    const { id, username, gender: rawGender, role: rawRole, parentid, phonenumber, address, personalnumber, birthday, educationlevel, experienceyears, teachingspecialization, classname
    } = formData;
    const formItems = props.formItems;
    const gender = rawGender === 'M' ? t('male') : rawGender === 'F' ? t('female') : null;
    const role = t(rawRole?.toLowerCase());
    const [form] = Form.useForm();
    const [allowToEdit, setAllowToEdit] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const userRole = props.userRole;
    const tabList = props.tabList;
    const [activeTab, setActiveTab] = useState(tabList[0].key);
    const contentList = {
        [t('profile-data')]: formData,
        [t('parent-data')]: parentFormData
    };
    useEffect(() => {
        if (props.passwordReseted) {
            messageApi.open({
                type: 'success',
                content: t('password-reseted-successfully'),
            });
        }
    }, [props.passwordReseted, messageApi, t]);

    return (
        <div>
            <Background />
            <div style={{ display: 'flex', margin: '30px 30px 0 30px' }}>
                {contextHolder}
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', height: 'fit-content', borderRadius: '20px', border: '1px solid Gray', padding: '20px 10px' }}>
                    <Button style={{ width: '200px', height: '200px', borderRadius: '50%' }}>{
                        formData.image ? <img src={formData.image} alt='profile-pic' style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <UserOutlined style={{ fontSize: '65px' }} />
                    }</Button>
                    <Title strong level={4} style={{ textAlign: 'center', margin: '25px 0 5px' }}>@{username}</Title>
                    <Title level={5} style={{ textAlign: 'center', marginTop: '0' }}>{role}</Title>
                </Card>
                <Card
                    tabList={tabList}
                    style={{
                        position: 'relation',
                        marginLeft: '100px',
                        width: '100%',
                        padding: '10px 20px 15px',
                        border: '1px solid Gray',
                        borderRadius: '20px'
                    }}
                    activeTabKey={activeTab}
                    onTabChange={(key) => setActiveTab(key)}
                >
                    <Form
                        layout='vertical'
                        form={form}
                        disabled={!allowToEdit}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', margin: '20px 0 60px 0' }}
                    >
                        {formItems(allowToEdit, contentList[activeTab])}
                    </Form>
                    <Flex gap='middle' style={{
                        position: 'absolute',
                        bottom: 25, right: 44
                    }}>
                        {!allowToEdit ? null : <Button type="primary" size="large" danger onClick={
                            () => {
                                props.cancelNewDataChange();
                                setAllowToEdit(false);
                                {
                                    messageApi.open({
                                        type: 'error',
                                        content: t('not-allowed-edit-data'),
                                    });
                                }
                            }
                        }>{t('cancel')} </Button>}
                        {!allowToEdit ? <Button type="primary" size="large" onClick={
                            () => {
                                {
                                    messageApi.open({
                                        type: 'success',
                                        content: t('allowed-edit-data'),
                                    });
                                }
                                setAllowToEdit(!allowToEdit);
                            }
                        }> <><EditOutlined /> {t('edit-data')}</></Button> : null}
                        {allowToEdit ? <Button type="primary" size="large" onClick={
                            () => {
                                {
                                    messageApi.open({
                                        type: 'success',
                                        content: t('data-changed-correctly'),
                                    });
                                }
                                setAllowToEdit(!allowToEdit);
                                props.updateNewData();
                            }
                        }> <><SaveOutlined /> {t('save-data')}</></Button> : null}
                    </Flex>
                </Card>
            </div >
        </div>
    );
}

const Background = () => (
    <div style={{
        position: 'absolute',
        top: -30,
        left: 0,
        width: '100%',
        height: '500px',
        backgroundImage: 'url(/images/profile-background.jpg)',
        backgroundSize: 'cover'
    }} />
);