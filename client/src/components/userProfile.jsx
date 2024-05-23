import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { Spin, Button, Typography, Form, Input, message, Select, DatePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import UserProfileUI from './ui/userProfileUI';

const { Title } = Typography;
const fetchData = async (axiosPrivate, userId, setOriginalData, setFormData, setLoading) => {
    try {
        const response = await axiosPrivate.get(`/users/${userId}`);
        setOriginalData(response.data);
        setFormData(response.data);
        setLoading(false);
    } catch (error) {
        console.error('There was an error!', error);
        message.error('There was an error fetching user data!');
    }
};
const allGender = [{
    value: 'M',
    label: 'MALE',
}, {
    value: 'F',
    label: 'FEMALE'
}];
const updateUsers = async (axiosPrivate, user, formData) => {
    try {
        const { id, password, firstname, lastname, email, gender, role, parentid, phonenumber, address, personalnumber, birthday, educationlevel, experienceyears, teachingspecialization, classname
        } = formData;
        console.log(formData);
        let data;
        switch (user) {
            case 'ADMIN':
                data = { id, firstname, lastname, email, role };
                break;
            case 'TEACHER':
                data = { id, firstname, lastname, email, gender, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, birthday, password };
                break;
            case 'STUDENT':
                data = { id, firstname, lastname, email, gender, personalnumber, classname, birthday, parentid, password, address };
                break;
            case 'PARENT':
                data = { id, firstname, lastname, email, address, phonenumber, password };
                break;
            default:
                console.error('Invalid role');
                return;
        }
        const response = await axiosPrivate.put(`users/${user}-update`, data);
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
};

export default function UserProfile() {
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();
    const location = useLocation();
    const [originalUserData, setOriginalUserData] = useState(null);
    const [originalParentData, setOriginalParentData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [parentFormData, setParentFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const userRole = originalUserData?.role;
    const [passwordReseted, setPasswordReseted] = useState(false);
    const tabList = [
        {
            key: t('profile-data'),
            label: t('profile-data'),
        },
    ];
    const userId = location.pathname.split('/').pop();
    useEffect(() => {
        fetchData(axiosPrivate, userId, setOriginalUserData, setFormData, setLoading);
    }, [axiosPrivate, userId]
    );
    useEffect(() => {
        if (formData?.parentid)
            fetchData(axiosPrivate, formData?.parentid, setOriginalParentData, setParentFormData, setLoading);
    }, [formData?.parentid, axiosPrivate]);
    if (loading) {
        return (
            <Spin
                className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                size='large'
            />
        );
    }
    if (formData.parentid) {
        tabList.push({
            key: t('parent-data'),
            label: t('parent-data'),
        });
    }
    const { id, username, password, firstname, lastname, email, gender: rawGender, role: rawRole, parentid, phonenumber, address, personalnumber, birthday, educationlevel, experienceyears, teachingspecialization, classname
    } = formData;
    const setValues = (key, value) => {
        setFormData(prevState => ({ ...prevState, [key]: value }));
    };
    const resetPassword = (personalnumber) => {
        setPasswordReseted(true);
        const updatedFormData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, null])
        );
        updatedFormData.id = formData.id;
        updatedFormData.password = userRole === 'TEACHER' ? phonenumber : personalnumber;
        updateUsers(axiosPrivate, userRole, updatedFormData);
    };
    const formItems = (allowToEdit, formData) => {
        const items = Object.entries(formData)
            .filter(([key, value]) => value !== null && key !== 'id' && key !== 'username' && key !== 'parentid')
            .map(([key, value], index) => {
                return (
                    <Form.Item key={index} label={t(key)}>
                        {key === 'gender' ? (
                            <StyledSelect
                                placeholder={t(`place-${key}`)}
                                defaultValue={value}
                                onChange={(value) => {
                                    setValues(key, value);
                                }}
                                options={allGender?.map((gender) => ({
                                    value: gender.value,
                                    label: t(gender.label?.toLowerCase())
                                }))}
                            />
                        ) : key === 'birthday' ? (
                            <StyledDate
                                format={'DD/MM/YYYY'}
                                disabledDate={(current) => current && current > moment().endOf('day')}
                                placeholder={t(`place-${key}`)}
                                value={dayjs(value)}
                                onChange={(date, dateString) => {
                                    setValues(key, date.format('DD/MM/YYYY'));
                                }}
                            />
                        ) : key === 'password' && allowToEdit ? (
                            <>
                                <StyledInput
                                    disabled
                                    placeholder={t(`place-${key}`)}
                                    value={value}
                                    onChange={(e) => setValues(key, e.target.value)}
                                />
                                <Button style={{ marginTop: '10px' }} onClick={() => resetPassword(personalnumber)}>{t('resetpassword')}</Button>
                            </>
                        ) : (
                            <StyledInput
                                placeholder={t(`place-${key}`)}
                                value={t(value)}
                                onChange={(e) => setValues(key, e.target.value)}
                                disabled={key === 'role' ? true : !allowToEdit}
                            />
                        )}
                    </Form.Item>
                );
            });
        return items;
    };
    const cancelNewDataChange = () => {
        setFormData(originalUserData);
        setParentFormData(originalParentData);
    };
    const updateNewData = () => {
        updateUsers(axiosPrivate, userRole, formData);
        setOriginalUserData(formData);
    };
    return (
        <UserProfileUI formItems={formItems} userRole={userRole} formData={formData} parentFormData={parentFormData} updateNewData={updateNewData} cancelNewDataChange={cancelNewDataChange} tabList={tabList} passwordReseted={passwordReseted} />
    );
}
const withLargeStyle = (Component) => (props) => (
    <Component
        {...props}
        size="large"
        style={{
            color: 'black',
            width: '100%'
        }}
    />
);

const StyledInput = withLargeStyle(Input);
const StyledSelect = withLargeStyle(Select);
const StyledDate = withLargeStyle(DatePicker);
