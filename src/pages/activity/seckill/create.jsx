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
  Radio,
  DatePicker
} from 'antd';
import { cloneDeep } from 'lodash';
import { useHistory } from 'react-router-dom';
import { orderStates, goodsInfoColumns } from './conf';
import PicturesWall from '../../../components/Upload';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

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
            label="秒杀名称"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="活动状态"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Radio.Group >
              <Radio value={1}>上线</Radio>
              <Radio value={2}>下线</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="秒杀时间段"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm"  />
          </Form.Item>





         
        

        

         
          <Form.Item label="商品信息" name="password">
              <div style={{marginBottom:'20px'}}>
              <Input placeholder="请输入" style={{width:'200px',marginRight:'10px'}}/>
              <Button type="primary" >
              商品识别
            </Button>
              </div>
           
            <Table dataSource={dataSource} columns={goodsInfoColumns} bordered />
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
