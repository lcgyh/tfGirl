import React, { useState, useEffect } from 'react';
import 'braft-editor/dist/index.css'
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
import BraftEditor from 'braft-editor'
import PicturesWall from '@/components/Upload';
import {reqArticalCreate,reqArticalUpdate} from './service'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateGoods = () => {
  const history = useHistory();
  const [fileImgs,setFileImgs]=useState([])
  const onFinish =async (values) => {
    console.log('Success:', values);
    await reqArticalCreate(values)
    goBack()
    message.success('操作成功')
  };


  const getFileListData=(data)=>{
    setFileImgs(data)
  }
  const goBack = () => {
    history.goBack();
  };

  return (
    <PageContainer>
      <Card>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="言语标题"
            name="title"
            rules={[{ required: true, message: '请输入言语标题' }]}
          >
            <Input placeholder="请输入" style={{ width: '300px' }} />
          </Form.Item>
          <Form.Item
            label="言语主图">
            <PicturesWall 
            fileImgs={fileImgs}
            getFileListData={getFileListData}
            imgLength={1}
            />
          </Form.Item>
          <Form.Item
            label="言语状态"
            name="wordStatus"
            rules={[{ required: true, message: '请选择言语状态' }]}
          >
            <Radio.Group >
              <Radio value={1}>开启</Radio>
              <Radio value={2}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="文章内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <BraftEditor
              style={{ border: '1px solid #aaa' }}
              placeholder="请输入正文内容" className="my-editor"
            />
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
