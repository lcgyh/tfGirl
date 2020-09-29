import React, { useState, useEffect } from 'react';
import { Modal, Input, message, Radio, Form } from 'antd';
import PicturesWall from '@/components/Upload';
import { editCountry } from '../service'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 10
  },
};

const Delivery = (props) => {
  const { visibleData, setVisibleData, setFormData } = props;
  const { record, visible } = visibleData;
  const [fileImgs, setFileImgs] = useState([])
  const { opType } = record

  useEffect(() => {
    if (record.countryUrl) {
      setFileImgs([
        {
          uid: '-1',
          status: 'done',
          url: record.countryUrl
        }
      ])
    } else {
      setFileImgs([])
    }
  }, [record])

  const handleOk = async () => {
    if (!fileImgs || fileImgs.length < 1) return message.error('请上传国家图片');
    record.countryUrl = fileImgs[0].url

    const params = {
      "countryId": record.countryId,
      "countryName":record.countryName,
      "countryStatus": record.countryStatus,
      "countryUrl": record.countryUrl,
      "opType": record.opType,
    }
    await editCountry(params)
    setVisibleData({
      visible: false,
      record: {},
    });
    setFormData({ isSearch: true })
    message.success('操作成功')
  };
  const handleCancel = () => {
    setVisibleData({
      visible: false,
      record: {},
    });
  };
  const onChange = (e, key) => {
    setVisibleData({
      visible: true,
      record: {
        ...visibleData.record,
        [key]: e && e.target ? e.target.value : e,
      },
    });
  };

  const getFileListData = (data) => {
    setFileImgs(data)
  }
  return (
    <div>
      <Modal title={opType === '1' ? '新增国家' : '国家编辑'} visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout}>
          <Form.Item label="国家名称">
            <Input
              placeholder="请输入"
              value={record.countryName}
              onChange={(e) => { onChange(e, 'countryName') }} />
          </Form.Item>
          <Form.Item label="国家状态">
            <Radio.Group onChange={(e) => { onChange(e, 'countryStatus') }} value={String(record.countryStatus)}>
              <Radio value='1'>启用</Radio>
              <Radio value='2'>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="国家logo">
            <PicturesWall
              fileImgs={fileImgs}
              getFileListData={getFileListData}
              imgLength={1}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Delivery;
