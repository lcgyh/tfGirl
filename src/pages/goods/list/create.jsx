import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Space, Button, Descriptions, Form, Input, Checkbox, Select } from 'antd';
import { orderStates } from './conf'

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
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
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
            <Input />
          </Form.Item>

          <Form.Item
            label="商品品牌"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>
          <Form.Item
            label="商品国家"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>
          <Form.Item
            label="一级分类"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>
          <Form.Item
            label="二级分类"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>
          <Form.Item
            label="商品图片"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>

          <Form.Item
            label="商品卖点"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <TextArea
              placeholder="请输入"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />

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
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>
          <Form.Item
            label="商品规格2"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>
          <Form.Item
            label="商品信息"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>

          </Form.Item>





          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Card>

    </PageContainer>
  )
}

export default CreateGoods