import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { UserOutlined } from '@ant-design/icons';
import { Spin, Button, Flex, Typography, Card, Form, Input, message } from 'antd';

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
  const userId = location.pathname.split('/').pop();
  useEffect(() => {
    fetchData(axiosPrivate, userId, setOriginUserData, setFormData, setLoading);
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
  const { name, lastName, mail, gender: rawGender, role: rawRole, parentId, phoneNumber, address, ssn } = formData;
  const gender = rawGender === 'M' ? t('male') : t('female');
  const role = t(rawRole.toLowerCase());
  const formItems = Object.entries({ name, lastName, mail, gender, role, phoneNumber, address, ssn })
    .filter(([key, value]) => value !== null)
    .map(([key, value]) => (
      <Form.Item label={t(key)} style={{ width: inputWidth[key] }}>
        <StyledInput
          placeholder={t(`place-${key}`)}
          value={value}
          onChange={(e) => setValues(key, e.target.value)}
        />
      </Form.Item>
    ));

  const setValues = (key, value) => {
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };
  const cancelNewDataChange = () => {
    setFormData(originalUserData);
  };
  return (
    <>
      <div style={{ display: 'flex', margin: '30px 30px 0 30px' }}>
        {contextHolder}
        <Flex vertical style={{ alignItems: 'center' }} >
          <Button style={{ width: '150px', height: '150px', borderRadius: '50%' }}>{
            formData.image ? <img src={formData.image} alt='profile-pic' style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <UserOutlined style={{ fontSize: '65px' }} />
          }</Button>
          {formData.image ? null : <Title level={5} style={{ width: 'max-content' }}>{t('upload-profile-pic')}</Title>}
        </Flex>
        <Card
          title={t('profile-data')}
          extra={<a href="#">More</a>}
          style={{
            position: 'relation',
            marginLeft: '100px',
            width: '100%',
            padding: '10px 20px 15px'
          }}
        >
          <Form
            layout='vertical'
            form={form}
            disabled={!allowToEdit}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', marginBottom: '40px' }}
          >
            {formItems}
          </Form>
          <Flex gap='middle' style={{
            position: 'absolute',
            bottom: 25, right: 30
          }}>
            {!allowToEdit ? null : <Button type="primary" danger onClick={
              () => {
                cancelNewDataChange();
                setAllowToEdit(false);
              }
            }>{t('cancel')} </Button>}
            <Button type="primary" onClick={
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
            }>{!allowToEdit ? t('edit-data') : t('save-data')}</Button>
          </Flex>
        </Card>
      </div >
    </>
  );
}

const StyledInput = (props) => (
  <Input
    {...props}
    style={{
      color: 'black'
    }}
  />
);
