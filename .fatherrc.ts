/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-03 16:23:14
 * @LastEditTime: 2020-11-04 17:55:20
 * @LastEditors: rodchen
 */
const extraBabelPlugins = [];

extraBabelPlugins.push([
  'babel-plugin-import',
  {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  },
]);

const config = {
  esm: {
    type: 'babel',
    minify: true,
  },

  disableTypeCheck: true,
  preCommit: {
    eslint: true,
    prettier: true,
  },
  extraBabelPlugins,
};

export default config;
