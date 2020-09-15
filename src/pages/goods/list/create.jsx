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
} from 'antd';
import { cloneDeep } from 'lodash';
import { useHistory } from 'react-router-dom';
import DeleteDes from './components/deleteDes';

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

  const deleteDes = (index) => {
    const list = cloneDeep(goodsDes);
    if (list.length < 2) return message.error('至少保留一组不能删除');
    list.splice(index, 1);
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
            label="商品名称"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="商品品牌"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className="itemLabel-input" allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="商品国家"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className="itemLabel-input" allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="一级分类"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className="itemLabel-input" allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="二级分类"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className="itemLabel-input" allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="商品图片"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <PicturesWall />
          </Form.Item>

          <Form.Item
            label="商品卖点"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <TextArea placeholder="请输入" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>

          <Form.Item
            label="商品详情"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="商品规格1"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className="itemLabel-input" allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="商品规格2"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className="itemLabel-input" allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="商品信息" name="password">
            <Table dataSource={dataSource} columns={goodsInfoColumns} bordered />
          </Form.Item>
          <Form.Item
            label="商品详情"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  addDes('1');
                }}
                type="primary"
                ghost
              >
                新增图片
              </Button>
              <Button
                onClick={() => {
                  addDes('2');
                }}
                type="primary"
                ghost
              >
                新增文本
              </Button>
            </Space>
            <div style={{ marginTop: '20px' }}>
              {goodsDes.map((item, index) => {
                return (
                  <div style={{ marginBottom: '10px' }}>
                    {item.type === '1' ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextArea placeholder="请输入" autoSize={{ minRows: 3, maxRows: 5 }} />
                        <DeleteDes deleteOption={deleteDes} index={index} />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <PicturesWall />
                        <DeleteDes deleteOption={deleteDes} index={index} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
