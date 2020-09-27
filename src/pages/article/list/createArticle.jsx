import React, { useState, useEffect } from 'react';
import 'braft-editor/dist/index.css'
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Button,
  Form,
  Input,
  message,
  Radio
} from 'antd';
import { useHistory,useParams } from 'react-router-dom';
import BraftEditor from 'braft-editor'
import PicturesWall from '@/components/Upload';
import {reqArticalCreate,reqArticalUpdate,reqArticalInfoData} from './service'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Articaledit = () => {
  const history = useHistory();
  const params = useParams();
  const {id} = params
  const [form] = Form.useForm();
  const [fileImgs,setFileImgs]=useState([])

  const goBack = () => {
    history.goBack();
  };
  const onFinish =async (values) => {
    if(!fileImgs || fileImgs.length<1) return message.error('请上传言语主图')
    const param={
      title:values.title,
      content:values.content.toHTML(),
      mainPic:fileImgs[0].url,
      wordStatus:values.wordStatus,
      wordType:1
    }

    if(id){
      param.id=id
      await reqArticalUpdate(param)
    }else{
      await reqArticalCreate(param)
    }
    goBack()
    message.success('操作成功')
  };

  const getFileListData=(data)=>{
    setFileImgs(data)
  }

  const getArticalInfo=async (param)=>{
    const result = await reqArticalInfoData({id:param})
    form.setFieldsValue({
      title: result.title,
      wordStatus: result.wordStatus,
      content: result.content,
    });
    if(result.mainPic){
      setFileImgs([{
        uid: '-1',
        status: 'done',
        url: result.mainPic
      }])
    }
  }

  useEffect(()=>{
    if(id){
      getArticalInfo()
    }
  },[id])
  
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
            initialValue={1}
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

export default Articaledit;
