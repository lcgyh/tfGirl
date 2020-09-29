import React from 'react';
import { Card, Space, Divider } from 'antd';
import styles from '../style.less';

const Block = (props) => {
  const { info, setVisibleAttrData } = props
  const editspecAttr = () => {
    setVisibleAttrData({
      visible: true,
      record: {
        specAttrStatus: String(info.specAttrStatus),
        specAttrName: info.specAttrName,
        specId: info.specId,
        specAttrId: info.specAttrId,
        opType: '2'
      }
    })
  }
  return (
    <div className={styles.block}>
      <div>{info.specAttrName}</div>
      <Divider type="vertical" />
      <div className={styles.block_edit} >
        {
          String(info.specAttrStatus) === '2' ? <div className={styles.block_no_use}>禁</div> : null
        }
        <div onClick={editspecAttr}>修改</div>
      </div>
    </div>
  );
};

const BlockList = (props) => {
  const { detail, setVisibleData, setVisibleAttrData } = props
  const { specName, specAttrs = [], specStatus } = detail

  const editSpec = () => {
    setVisibleData({
      visible: true,
      record: {
        specStatus: String(detail.specStatus),
        specName: detail.specName,
        specId: detail.specId,
        opType: '2'
      },
    })
  }

  const CardTitle = (title, state) => {
    return (
      <div className={styles.card_title}>
        <div>{title}</div>
        {String(state) === '2' ? <div className={styles.card_title_icon}>禁</div> : null}
      </div>
    );
  };
  return (
    <Card title={CardTitle(specName, specStatus)} bordered={false} extra={<span className={styles.block_edit} onClick={editSpec}>修改</span>}>
      <Space style={{ flexWrap: 'wrap' }}>
        {specAttrs.map((item) => {
          return <Block info={item} setVisibleAttrData={setVisibleAttrData} />
        })
        }
      </Space>
    </Card>
  );
};

export default BlockList;
