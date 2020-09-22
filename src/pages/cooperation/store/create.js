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
import { useHistory, useParams } from 'react-router-dom';
import PicturesWall from '@/components/Upload';
import { reqStoreInfo, reqEditStore,reqResetPwd } from './service'
import StoreModal from './components/storeModal'

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CreateGoods = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const history = useHistory();
  const { shopId } = params
  const [opType, setOpType] = useState(1)
  const [fileImgs, setFileImgs] = useState([]);
  const [visibleData, setVisibleData] = useState({
    visible: false,
    record: {},
  });

  const goBack = () => {
    history.goBack();
  };

  const onFinish = async (values) => {
    const shopHeadPics = fileImgs.map((item)=>{
      return item.url
    })
    if(shopHeadPics.length<1) return message.error('请上传门店门头图片')
    const data = {
      ...values,
      opType,
      shopHeadPic:shopHeadPics[0],
    }
    const result = await reqEditStore(data)
    setVisibleData({
      visible: true,
      record: result,
    })
  };

  const getStoreInfo = async () => {
    const result = await reqStoreInfo(params)
    setOpType(2)
    form.setFieldsValue({
      shopName: result.shopName,
      shoperName:result.shoperName,
      shopMobile:result.shopMobile,
      shopStatus:result.shopStatus || 1,
      shopAddress:result.shopAddress,
      remark:result.remark,
      shoperAppId:result.shoperAppId,
      shoperMchId:result.shoperMchId
    });

    if(result.shopHeadPic){
      setFileImgs([
        {
          uid: '-1',
          status: 'done',
          url:result.shopHeadPic
        }
      ])
    }
  }

  const formChange = (e, key) => {
    form.setFieldsValue({
      [key]: e && e.target ? e.target.value : e
    });
  }

  const getFileListData=(data)=>{
    setFileImgs(data)
  }

  const resetPassWord=async ()=>{
    const result = await reqResetPwd(shopId)
    setVisibleData({
      visible: true,
      record: result,
    })
  }

  useEffect(() => {
    if (!shopId) return
    getStoreInfo()
  }, [shopId])


  return (
    <PageContainer>
      <Card>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="门店名称"
            name="shopName"
            rules={[{ required: true, message: '请输入门店名称' }]}
          >
            <Input placeholder="请输入" onChange={(e) => { formChange(e, 'shopName') }} />
          </Form.Item>

          <Form.Item
            label="联系人"
            name="shoperName"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input placeholder="请输入" onChange={(e) => { formChange(e, 'shoperName') }}  />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="shopMobile"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入" onChange={(e) => { formChange(e, 'shopMobile') }} />
          </Form.Item>
          <Form.Item
            label="门店状态"
            name="shopStatus"
            initialValue={1}
            rules={[{ required: true, message: '请选择门店状态' }]}
          >
            <Radio.Group onChange={(e) => { formChange(e, 'shopStatus') }} >
              <Radio value={1}>开启</Radio>
              <Radio value={2}>关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="门店地址"
            name="shopAddress"
            rules={[{ required: true, message: '请输入门店地址' }]}
          >
            <Input placeholder="请输入" onChange={(e) => { formChange(e, 'shopAddress') }}  />
          </Form.Item>
          <Form.Item
            label="品牌门头"
          >
            <PicturesWall fileImgs={fileImgs} getFileListData={getFileListData} imgLength={5}/>
          </Form.Item>

          <Form.Item
            label="门店介绍"
            name="remark"
            rules={[{ required: true, message: '请输入门店介绍' }]}
          >
            <TextArea placeholder="请输入" autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => { formChange(e, 'remark') }}  />
          </Form.Item>

          <Form.Item
            label="小程序APPID"
            name="shoperAppId"
            rules={[{ required: true, message: '请输入门店小程序APPID' }]}
          >
            <Input placeholder="请输入" onChange={(e) => { formChange(e, 'shoperAppId') }} />
          </Form.Item>
          <Form.Item
            label="微信商户号"
            name="shoperMchId"
            rules={[{ required: true, message: '请输入微信商户号' }]}
          >
            <Input placeholder="请输入" onChange={(e) => { formChange(e, 'shoperMchId') }}  />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            {
              shopId?<Button style={{ marginLeft: '20px' }} danger onClick={resetPassWord} type="primary">
              重置密码
            </Button>:null
            }
            
            <Button style={{ marginLeft: '20px' }} onClick={goBack}>
              返回
            </Button> 
          </Form.Item>
        </Form>
      </Card>
      <StoreModal visibleData={visibleData} setVisibleData={setVisibleData} goBack={goBack}/>
    </PageContainer>
  );
};

export default CreateGoods;
