
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Form, Input, message, Radio } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import PicturesWall from '@/components/Upload';
import { reqBannerInfo, reqEditBanner } from './service'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  },
};


const CreateBanner = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const history = useHistory();
  const { bannerId } = params
  const [opType, setOpType] = useState(1)
  const [fileImgs, setFileImgs] = useState([]);
  const [linkTypeSelect, setLinkTypeSelect] = useState('1');


  const goBack = () => {
    history.goBack();
  };

  const onFinish = async (values) => {
    const shopHeadPics = fileImgs.map((item) => {
      return item.url
    })
    if (shopHeadPics.length < 1) return message.error('请上传banner图片')
    const data = {
      ...values,
      opType,
      bannerPic: shopHeadPics[0],
    }
    if (opType === 2) {
      data.bannerId = bannerId
    }
    await reqEditBanner(data)
    goBack()
    message.error('操作成功')
  };

  const getStoreInfo = async () => {
    const result = await reqBannerInfo(params)
    setOpType(2)
    form.setFieldsValue({
      bannerName: result.bannerName,
      bannerStatus: result.bannerStatus,
      bannerRank: result.bannerRank,
      spuId: result.spuId,
      roomId: result.roomId,
      linkType:result.spuId?'1':(result.roomId?'2':'1'),
    });

    if (result.bannerPic) {
      setFileImgs([{
        uid: '-1',
        status: 'done',
        url: result.bannerPic
      }])
    }
  }

  const formChange = (e) => {
    setLinkTypeSelect(e.target.value)
  }

  const getFileListData = (data) => {
    setFileImgs(data)
  }

  useEffect(() => {
    if (!bannerId) return
    getStoreInfo()
  }, [bannerId])

  return (
    <PageContainer >
      <Card>
        <Form {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="banner名称"
            name="bannerName"
            rules={
              [{
                required: true,
                message: '请输入banner名称'
              }]
            } >
            <Input placeholder="请输入"/>
          </Form.Item>
          <Form.Item
            label="banner状态"
            name="bannerStatus"
            initialValue={1}
            rules={
              [{
                required: true,
                message: '请选择banner状态'
              }]
            } >
            <Radio.Group>
              <Radio value={1} > 上线 </Radio>
              <Radio value={2} > 下线 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="banner权重"
            name="bannerRank"
            rules={
              [{
                required: true,
                message: '请输入联系人'
              }]
            } >
            <Input placeholder="请输入"/>
          </Form.Item>
          <Form.Item label="banner图片" >
            <PicturesWall
              fileImgs={fileImgs}
              getFileListData={getFileListData}
              imgLength={1}
            />
          </Form.Item>
          <Form.Item
            label="链接类型"
            name="linkType"
            onChange={(e) => { formChange(e) }}
            rules={[{ required: true, message: '请选择banner链接类型' }]}
            initialValue='1'
          >
            <Radio.Group >
              <Radio value='1'>商品</Radio>
              <Radio value='2'>直播</Radio>
            </Radio.Group>
          </Form.Item>
          {
            linkTypeSelect==='1'? <Form.Item
            label="SPUID"
            name="spuId"
            rules={[{ required: true, message: '请输入SPUID' }]}
            >
            <Input placeholder="请输入"/>
            </Form.Item>:null
          }
          {
            linkTypeSelect==='2'?
            <Form.Item
            label="直播间ID"
            name="roomId"
            rules={[{ required: true, message: '请输入直播间ID' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>:null
          }
         
          
          <Form.Item {...tailLayout} >
            <Button
              type="primary"
              htmlType="submit" >
              提交
              </Button>
            <Button
              style={{ marginLeft: '20px' }}
              onClick={goBack} >
              返回
              </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateBanner;







