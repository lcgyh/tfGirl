import React, { useState, useEffect } from 'react';
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
import PicturesWall from '@/components/Upload';
import UploadOut from '@/components/Upload/upload'
import {reqArticalCreate,reqArticalUpdate,reqArticalInfoData} from './service'


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateGoods = () => {
  const history = useHistory();
  const [fileImgs,setFileImgs] =useState([])
  const [fileVoices,setFileVoices] =useState([])
  const params = useParams();
  const {id} = params
  const [form] = Form.useForm();

  const goBack = () => {
    history.goBack();
  };
  const onFinish =async (values) => {
    if(!fileImgs || fileImgs.length<1) return message.error('请上传语音主图')
    if(!fileVoices || fileVoices.length<1) return message.error('请上传语音内容')
    const param={
      title:values.title,
      content:fileVoices[0].url,
      mainPic:fileImgs[0].url,
      wordStatus:values.wordStatus,
      wordType:2
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

  const getFileVoiceData=(data)=>{
    setFileVoices(data)
  }

  const getArticalInfo=async (param)=>{
    const result = await reqArticalInfoData({id:param})
    form.setFieldsValue({
      title: result.title,
      wordStatus: result.wordStatus,
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
        
        >
          <Form.Item
            label="言语标题"
            name="title"
            rules={[{ required: true, message: '请输入言语标题' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="言语主图"
          >
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
          >
            <UploadOut 
              fileImgs={fileVoices}
              getFileListData={getFileVoiceData}
              imgLength={1}
            />
            <div style={{marginTop:"10px"}}>*请上传的音频文件(mp3)</div>
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
