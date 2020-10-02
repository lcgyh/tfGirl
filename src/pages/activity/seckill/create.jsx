import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Form, Input, message, Radio ,DatePicker,Table} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment'
import { resSkillInfo, reqEditSkill } from './service'
import {reqGoodsInfo} from  '../../goods/list/service'
import {getGoodsColumnInfo} from './config'
import styles from './style.less';

const { RangePicker } = DatePicker;
const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16
  },
};


const CreateBanner = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const history = useHistory();
  const { skillId } = params
  const [opType, setOpType] = useState(1)
  const [skus, setSkus] = useState([]);
  const [spuId, setSpuId] = useState();
  const [spuInfo, setSpuInfo] = useState({});

  
  

  const goBack = () => {
    history.goBack();
  };

  const onFinish = async (values) => {
    
    
    const data = {
      ...values,
      opType
    }
    if (opType === 2) {
      data.skillId = skillId
    }
    await reqEditSkill(data)
    goBack()
    message.error('操作成功')
  };

  const getSkillInfo = async () => {
    const result = await resSkillInfo(params)
    setOpType(2)
    form.setFieldsValue({
      skillName: result.skillName,
      skillStatus: result.skillStatus,
      skillDate: [moment(result.startTime).valueOf(),moment(result.endTime).valueOf()],
    });
    setSkus(result.skus)
  }

  const formChange = (e, key) => {
    form.setFieldsValue({
      [key]: e && e.target ? e.target.value : e
    });
  }

  const getGoodsSku=async ()=>{
    if(!spuId) return
    const result = await reqGoodsInfo({spuId})
    const {pdSkus,pdSpu} = result
    setSkus(pdSkus)
    setSpuInfo(pdSpu)
  }

  useEffect(() => {
    if (!skillId) return
    getSkillInfo()
  }, [skillId])

  return (
    <PageContainer >
      <Card>
        <Form {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="活动名称"
            name="skillName"
            rules={
              [{
                required: true,
                message: '请输入活动名称'
              }]
            } >
            <Input
              placeholder="请输入"
              onChange={
                (e) => {
                  formChange(e, 'skillName')
                }
              }
            />
          </Form.Item>
          <Form.Item
            label="活动状态"
            name="skillStatus"
            initialValue={1}
            rules={
              [{
                required: true,
                message: '请选择活动状态'
              }]
            } >
            <Radio.Group
              onChange={(e) => { formChange(e, 'skillStatus') }} >
              <Radio value={1} > 上线 </Radio>
              <Radio value={2} > 下线 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="秒杀时间段"
            name="skillDate"
            rules={
              [{
                required: true,
                message: '请输入秒杀时间段'
              }]
            } >
            <RangePicker 
              format="YYYY-MM-DD HH:mm" 
              onChange={(e) => {
                formChange(e, 'skillDate');
              }} 
            />
          </Form.Item>
          <Form.Item label="秒杀商品" >
            <div className={styles.goods_table}>
            <Input
              placeholder="请输入商品spuId"
              style={{width:'300px'}}
              onChange={
                (e) => {
                  setSpuId(e.target.value)
                }
              }
            />
            <Button type='primary' onClick={getGoodsSku}>识别商品</Button>
            </div>
          
          <Table
          dataSource={skus}
          // columns={getColumns(spuInfo.specId1Str,spuInfo.specId2Str)}
          columns={getGoodsColumnInfo(!spuInfo.specId2 ? 'specAttrId2' : null)}
          bordered
          pagination={false}
        />
          </Form.Item>
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










