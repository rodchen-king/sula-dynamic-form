/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-04 16:42:58
 * @LastEditTime: 2020-11-04 19:23:52
 * @LastEditors: rodchen
 */
import React from 'react';
import { Affix, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ThemeContext from '../../layout/themeContext';
import { Guide } from '../guide';

export default props => {
  const { onClick } = props;
  const theme = React.useContext(ThemeContext);

  if (theme.hiddenCustomControls) {
    return null;
  }

  const style = { position: 'fixed', top: 360, right: 24, zIndex: 1001 };

  return (
    <Affix style={style}>
      <Guide
        step="1"
        style={style}
        snapshot="https://img.alicdn.com/tfs/TB1YHyfH.H1gK0jSZSyXXXtlpXa-1774-850.png"
        tips="点击设置按钮进行全局代码配置"
      >
        <Button
          style={{ width: 50, height: 50, lineHeight: '57px' }}
          icon={<SettingOutlined style={{ fontSize: 30 }} />}
          type="primary"
          onClick={onClick}
        />
      </Guide>
    </Affix>
  );
};
