import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Form, Input, message, Radio ,DatePicker,Table} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment'
import { cloneDeep } from 'lodash';
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
    
    const data={
      skillName:values.skillName,
      skillStatus:values.skillStatus,
      startTime:moment(values.skillDate[0]).format('YYYY-MM-DD HH:mm'),
      endTime:moment(values.skillDate[1]).format('YYYY-MM-DD HH:mm'),
      opType:'1',
      spuId,
      skus
    }

    if (opType === 2) {
      data.skillId = skillId
      data.opType = '2'
    }
    await reqEditSkill(data)
    goBack()
    message.error('操作成功')
  };

  const getSkillInfo = async () => {
    const result = await resSkillInfo(params)
    setOpType(2)
    getGoodsSpuInfo(result.spuId)
    form.setFieldsValue({
      skillName: result.skillName,
      skillStatus: result.skillStatus,
      skillDate: [moment(result.startTime).valueOf(),moment(result.endTime).valueOf()],
    });
    setSkus(result.skus)
    setSpuId(result.spuId)
    
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

  const getGoodsSpuInfo=async (spuId)=>{
    if(!spuId) return
    const result = await reqGoodsInfo({spuId})
    const {pdSpu} = result
    setSpuInfo(pdSpu)
  }

  useEffect(() => {
    if (!skillId) return
    getSkillInfo()
  }, [skillId])

  const skillPriceChnage=(value,index)=>{
    const newDatadouce= cloneDeep(skus)
    newDatadouce[index].skillPrice=value
    setSkus(newDatadouce)
  }

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
          dataSource={skus.map((item)=>{
            return {...item,skillPriceChnage}
          })}
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










