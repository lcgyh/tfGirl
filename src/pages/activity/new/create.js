import React, {
  useState,
  useEffect
} from 'react';
import {
  PageContainer
} from '@ant-design/pro-layout';
import {
  Card,
  Button,
  Form,
  Input,
  message,
  Radio
} from 'antd';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import {
  reqNewInfo,
  reqEditNew
} from './service'

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
  const {newId} = params
  const [opType, setOpType] = useState(1)

  const goBack = () => {
    history.goBack();
  };
  const onFinish = async (values) => {
    const data = {
      ...values,
      opType,
    }
    if (opType === 2) {
      data.newId = newId
    }
    await reqEditNew(data)
    goBack()
    message.error('操作成功')
  };

  const gethotInfo = async () => {
    const result = await reqNewInfo(params)
    setOpType(2)
    form.setFieldsValue({
      newName: result.newName,
      spuId: result.spuId,
      newStatus: result.newStatus,
    });
  }


  useEffect(() => {
    if (!newId) return
    gethotInfo()
  }, [newId])

  return ( 
    <PageContainer >
      <Card >
        <Form 
          form={form}
          {...layout}
          name = "basic"
          onFinish = {onFinish} >
            <Form.Item 
              label = "活动名称"
              name = "newName"
              rules = {
                [{
                  required: true,
                  message: '请输入活动名称'
                }]
              } 
            >
              <Input placeholder = "请输入"/>  
            </Form.Item >
            <Form.Item 
              label = "活动商品(spuId)"
              name = "spuId"
              rules = {
                [{
                  required: true,
                  message: '请输入活动商品'
                }]
              } >
              <Input placeholder = "请输入"
            /> 
            </Form.Item>

            <Form.Item 
              label = "活动状态"
              name = "newStatus"
              initialValue = {1}
              rules = {
                [{
                  required: true,
                  message: '请选择活动状态'
                }]
              } >
            <Radio.Group >
              <Radio value = {1} > 上线 </Radio> 
              <Radio value = {2} > 下线 </Radio> 
            </Radio.Group > 
            </Form.Item> 
            <Form.Item {...tailLayout} >
              <Button 
              type = "primary"
              htmlType = "submit" >
              提交 
              </Button> 
              <Button style = {{marginLeft: '20px'}}
              onClick = {goBack} >
              返回 
              </Button> 
            </Form.Item > 
        </Form> 
      </Card > 
    </PageContainer>
  );
};

export default CreateBanner;
