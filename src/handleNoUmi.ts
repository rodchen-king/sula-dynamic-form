/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-03 16:23:14
 * @LastEditTime: 2020-11-04 20:42:11
 * @LastEditors: rodchen
 */

import {
  registerFieldPlugins,
  registerRenderPlugins,
  registerActionPlugins,
  registerFilterPlugins,
  Icon,
} from 'sula';
import 'antd/dist/antd.css'; // 引入antd主题
import { UserOutlined } from '@ant-design/icons';
// 注册插件
registerFieldPlugins();
registerRenderPlugins();
registerActionPlugins();
registerFilterPlugins();
// 注册icon

Icon.iconRegister({
  // @ts-ignore
  user: UserOutlined,
});
