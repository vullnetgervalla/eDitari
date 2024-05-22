import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { UserOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Spin, Button, Flex, Typography, Card, Form, Input, message, Select } from 'antd';
import moment from 'moment';

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
const fetchRoles = async (axiosPrivate, setAllRoles) => {
  try {
    const response = await axiosPrivate.get('/users/get-roles');
    setAllRoles(response.data);
  } catch (error) {
    console.error('Error fetching roles:', error);
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
    let data;
    switch (user) {
      case 'ADMIN':
        data = { id, firstname, lastname, email, role, password };
        break;
      case 'TEACHER':
        data = { id, firstname, lastname, email, role, gender, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, birthday, password };
        break;
      case 'STUDENT':
      case 'PARENT':
        data = { id, firstname, lastname, email, role, gender, personalnumber, classid, birthday, parent, password, address};
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
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [allowToEdit, setAllowToEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [allRoles, setAllRoles] = useState();
  const tabList = [
    {
      key: t('profile-data'),
      label: t('profile-data'),
    },
  ];
  const userId = location.pathname.split('/').pop();
  useEffect(() => {
    fetchData(axiosPrivate, userId, setOriginalUserData, setFormData, setLoading);
    fetchRoles(axiosPrivate, setAllRoles);
  }, [axiosPrivate, userId]
  );
  if (loading) {
    return (
      <Spin
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        size='large'
      />
    );
  }
  const { id, username, password, firstname, lastname, email, gender: rawGender, role: rawRole, parentid, phonenumber, address, personalnumber, birthday, educationlevel, experienceyears, teachingspecialization, classname
  } = formData;
  const gender = rawGender === 'M' ? t('male') : rawGender === 'F' ? t('female') : null;
  const role = t(rawRole?.toLowerCase());
  if (parentid) {
    tabList.push({
      key: t('parent-data'),
      label: t('parent-data'),
    });
  }
  const setValues = (key, value) => {
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };
  const formItems = Object.entries({ firstname, lastname, email, password, gender, role, parentid, phonenumber, address, personalnumber, birthday, educationlevel, experienceyears, teachingspecialization, classname })
    .filter(([key, value]) => value !== null)
    .map(([key, value], index) => {
      return (
        <Form.Item key={index} label={t(key)}>
          {(key === 'role' || key === 'gender') ? (
            <StyledSelect
              placeholder={t(`place-${key}`)}
              defaultValue={value}
              onChange={(value) => {
                setValues(key, value);
              }}
              options={
                key === 'role' ?
                  allRoles?.map((role) => ({
                    value: role.name,
                    label: t(role.name?.toLowerCase()),
                  })) : 
                  allGender?.map((gender) => ({
                    value: gender.value,
                    label: t(gender.label?.toLowerCase())
                  }))
                  
              }
            />
          ) : (
            <StyledInput
              placeholder={t(`place-${key}`)}
              value={value}
              onChange={(e) => setValues(key, e.target.value)}
            />
          )}
        </Form.Item>
      );
    });
  const cancelNewDataChange = () => {
    setFormData(originalUserData);
  };
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
        >
          <Form
            layout='vertical'
            form={form}
            disabled={!allowToEdit}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', margin: '20px 0 60px 0' }}
          >
            {formItems}
          </Form>
          <Flex gap='middle' style={{
            position: 'absolute',
            bottom: 25, right: 44
          }}>
            {!allowToEdit ? null : <Button type="primary" size="large" danger onClick={
              () => {
                cancelNewDataChange();
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
                setAllowToEdit(!allowToEdit);
                {
                  messageApi.open({
                    type: 'success',
                    content: t('allowed-edit-data'),
                  });
                }

              }
            }> <><EditOutlined /> {t('edit-data')}</></Button> : null}
            {allowToEdit ? <Button type="primary" size="large" onClick={
              () => {
                setAllowToEdit(!allowToEdit);
                console.log(originalUserData.role)
                updateUsers(axiosPrivate, originalUserData.role, formData);
                setOriginalUserData(formData);
                {
                  messageApi.open({
                    type: 'success',
                    content: t('data-changed-correctly'),
                  });
                }
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
    height: '35%',
    backgroundImage: 'url(/images/profile-background.jpg)',
    backgroundSize: 'cover'
  }} />
);
const withLargeStyle = (Component) => (props) => (
  <Component
    {...props}
    size="large"
    style={{
      color: 'black'
    }}
  />
);

const StyledInput = withLargeStyle(Input);
const StyledSelect = withLargeStyle(Select);
