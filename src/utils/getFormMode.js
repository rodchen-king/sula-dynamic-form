/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-03 16:32:39
 * @LastEditTime: 2020-11-03 16:50:52
 * @LastEditors: rodchen
 */
const getFormMode = props => {
  let mode = 'create';
  // const { path } = props.match;
  // if (path.includes('edit')) {
  //   mode = 'edit';
  // } else if (path.includes('view') || path.includes('detail')) {
  //   mode = 'view';
  // }
  return mode;
};

export default getFormMode;
