import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Card, DatePicker, Space, Divider } from 'antd';
import styles from '../style.less';

const Block = (props) => {
    const { info, setVisibleAttrData } = props
    const editspecAttr = () => {
        setVisibleAttrData(
            {
                visible: true,
                record: {
                    provinceName: info.provinceName,
                    expressFeeId: info.expressFeeId,
                    expressPrice: info.expressPrice || 0,
                    provinceId:info.provinceId,
                    opType:'2'
                }
            }
        )
    }
    return (
        <div className={styles.block}>
            <div>{info.provinceName}</div>
            <Divider type="vertical" />
            <div className={styles.block_edit} onClick={editspecAttr}>修改</div>
        </div>
    );
};

const BlockList = (props) => {
    const { list, setVisibleAttrData } = props

    return (
        <Card bordered={false}>
            <Space style={{ flexWrap: 'wrap' }}>
                {list.map((item, index) => {
                    return <Block info={item} key={index} setVisibleAttrData={setVisibleAttrData} />
                })
                }
            </Space>
        </Card>
    );
};

export default BlockList;
