/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-03 16:23:14
 * @LastEditTime: 2020-11-05 00:02:58
 * @LastEditors: rodchen
 */

import { default as DynamicForm } from './Dynamic';

const SulaDynamicFormFC = () => {
  require('./handleNoUmi');

  return DynamicForm;
};

export { SulaDynamicFormFC, DynamicForm };
