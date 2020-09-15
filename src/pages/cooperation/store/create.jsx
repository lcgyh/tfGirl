import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Table,
  Space,
  Button,
  Descriptions,
  Form,
  Input,
  Checkbox,
  Select,
  message,
  Radio
} from 'antd';
import { cloneDeep } from 'lodash';
import { useHistory } from 'react-router-dom';


import { orderStates, goodsInfoColumns } from './conf';
import PicturesWall from '../../../components/Upload';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateGoods = () => {
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [goodsDes, setGoodsDes] = useState([
    {
      type: '1',
      value: '122',
    },
    {
      type: '2',
      value: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const addDes = (type) => {
    const list = cloneDeep(goodsDes);
    list.push({
      type,
      value: '',
    });
    setGoodsDes(list);
  };



  const goBack = () => {
    history.goBack();
  };

  return (
    <PageContainer>
      <Card>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="门店名称"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="联系人"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="门店状态"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Radio.Group >
              <Radio value={1}>开启</Radio>
              <Radio value={2}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="门店地址"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="品牌门头"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <PicturesWall />
          </Form.Item>

          <Form.Item
            label="门店介绍"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <TextArea placeholder="请输入" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>

          <Form.Item
            label="小程序APPID"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="微信商户号"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{ marginLeft: '20px' }} onClick={goBack}>
              返回
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateGoods;
