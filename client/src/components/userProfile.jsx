import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { UserOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Spin, Button, Flex, Typography, Card, Form, Input, message, Select } from 'antd';

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
const inputWidth = {
  name: '25%',
  lastName: '25%',
  mail: '33%',
  gender: '18%',
  role: '20%',
  phoneNumber: '20%',
  address: '25%',
  ssn: '20%'
};

export default function UserProfile() {
  const axiosPrivate = useAxiosPrivate();
  const { t } = useTranslation();
  const location = useLocation();
  const [originalUserData, setOriginUserData] = useState(null);
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
    fetchData(axiosPrivate, userId, setOriginUserData, setFormData, setLoading);
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
  const { userName, firstName, lastName, mail, gender: rawGender, role: rawRole, parentId, phoneNumber, address, ssn } = formData;
  const gender = rawGender === 'M' ? t('male') : rawGender === 'F' ? t('female') : null;
  const role = t(rawRole?.toLowerCase());
  if (parentId) {
    tabList.push({
      key: t('parent-data'),
      label: t('parent-data'),
    });
  }
  const formItems = Object.entries({ firstName, lastName, mail, gender, role, phoneNumber, address, ssn })
    .filter(([key, value]) => value !== null)
    .map(([key, value], index) => (
      <Form.Item key={index} label={t(key)}>
        {(key === 'role' || key === 'gender') ? (
          <StyledSelect
            placeholder={t(`place-${key}`)}
            defaultValue={value}
            onChange={(value) => setValues(key, value)}
            options={
              key === 'role' ?
                allRoles?.map((role) => ({
                  value: role.id,
                  label: t(role.name?.toLowerCase()),
                })) :
                [
                  { value: 'male', label: t('male') },
                  { value: 'female', label: t('female') }
                ]
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
    ));
  const setValues = (key, value) => {
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };
  const cancelNewDataChange = () => {
    setFormData(originalUserData);
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <Background />
      <div style={{ display: 'flex', margin: '30px 30px 0 30px' }}>
        {contextHolder}
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', height: 'fit-content', borderRadius: '20px', border: '1px solid Gray', padding: '20px 10px' }}>
          <Button style={{ width: '200px', height: '200px', borderRadius: '50%' }}>{
            formData.image ? <img src={formData.image} alt='profile-pic' style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <UserOutlined style={{ fontSize: '65px' }} />
          }</Button>
          <Title strong level={4} style={{ textAlign: 'center', margin: '25px 0 5px' }}>@{userName}</Title>
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
              }
            }>{t('cancel')} </Button>}
            <Button type="primary" size="large" onClick={
              () => {
                setAllowToEdit(!allowToEdit);
                {
                  !allowToEdit ? messageApi.open({
                    type: 'success',
                    content: t('allowed-edit-data'),
                  }) : messageApi.open({
                    type: 'error',
                    content: t('not-allowed-edit-data'),
                  });
                }

              }
            }>{!allowToEdit ? <><EditOutlined /> {t('edit-data')}</> : <><SaveOutlined /> {t('save-data')}</>}</Button>
          </Flex>
        </Card>
      </div >
    </div>
  );
}

const Background = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '40%',
    backgroundImage: 'url(/images/profile-background.jpg)',
    backgroundSize: 'cover',
    borderRadius: '8px 8px 0 0',
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
