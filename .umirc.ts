/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-03 16:23:14
 * @LastEditTime: 2020-11-04 10:41:33
 * @LastEditors: rodchen
 */
import { defineConfig } from 'dumi';
const path = require('path');

export default defineConfig({
  title: 'sula-dynamic-form',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  alias: {
    '@': path.resolve('src/'),
  },
  sula: {},
  // more config: https://d.umijs.org/config
});
