import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Flex, Input, Spin, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useCapabilities } from 'hooks/useCapabilities';

const CheckboxGroup = Checkbox.Group;
let plainOptions = [];

export default function CreateRole() {
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const axiosPrivate = useAxiosPrivate();
  const { capabilities, loading } = useCapabilities(axiosPrivate);
  const [checkedList, setCheckedList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [wrongNameInput, setWrongNameInput] = useState(false);
  if (loading) {
    return (
      <Spin
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        size='large'
      />
    );
  }
  plainOptions = capabilities.map((item) => t(item.capability_name));
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list) => {
    const values = capabilities.reduce((acc, item) => {
      if (list?.includes(t(item.capability_name))) {
        acc.push(item.capability_name);
      }
      return acc;
    }, []);
    setRequestList(values);
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const resetData = () => {
    setCheckedList([]);
    setRoleName('');
  };
  const checkName = (e) => {
    const value = e.target.value;
    if (/\d/.test(value)) {
      setWrongNameInput(true);
      messageApi.open({
        type: 'error',
        content: t('role-cannot-contain-numbers'),
      });
    } else {
      wrongNameInput ? setWrongNameInput(false) : null;
      setRoleName(value);
    }
  };
  const addRole = async (roleName, capabilities) => {
    try {
      await axiosPrivate.post('/users/create-role', {
        roleName,
        capabilities,
      });
      resetData();
      messageApi.open({
        type: 'success',
        content: t('role-created-successfully'),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex
      vertical
      gap='large'
    >
      {contextHolder}
      <Flex>
        <Input
          size='large'
          placeholder={t('new-role-name')}
          prefix={<UserOutlined />}
          value={roleName}
          onChange={checkName}
          style={{
            width: '25%',
            marginBottom: '30px',
          }}
          status={wrongNameInput ? 'error' : undefined}
        />
      </Flex>
      <div style={{ margin: '0 0 0 20px' }}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          {t('check-all-functionalities')}
        </Checkbox>
        <Divider />
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          style={{
            width: '100%',
            gap: '40px',
          }}
          onChange={onChange}
        ></CheckboxGroup>
      </div>
      <Flex
        gap='middle'
        style={{ position: 'absolute', bottom: 60, right: 60 }}
      >
        <Button
          type='primary'
          danger
          onClick={resetData}
        >
          {t('reset')}
        </Button>
        <Button
          type='primary'
          onClick={() => addRole(roleName?.toUpperCase(), requestList)}
          style={{ padding: '0 30px 0 30px' }}
        >
          {t('create')}
        </Button>
      </Flex>
    </Flex>
  );
}
