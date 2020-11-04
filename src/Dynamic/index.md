---
nav:
  title: Components
  path: /components
---

## 动态表单

表单:

```tsx
import React from 'react';
import DynamicForm from './index';
// import { cardConfig as config } from '@sula/templates';

const config = {
  mode: 'create',
  container: {
    type: 'div',
    props: {
      style: {
        background: '#fff',
        padding: '24px',
        borderRadius: 2,
        margin: '0 auto 72px',
        maxWidth: 1000,
      },
    },
  },
  itemLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 8,
    },
  },
  fields: [
    {
      name: 'senderName',
      label: '发送人姓名',
      field: {
        type: 'input',
        props: {
          placeholder: '请输入发送人姓名',
        },
      },
      rules: [
        {
          required: true,
          message: '该项为必填项',
        },
      ],
    },
    {
      name: 'secrecy',
      label: '是否保密',
      field: {
        type: 'switch',
        props: {
          checkedChildren: 'on',
          unCheckedChildren: 'off',
        },
      },
      valuePropName: 'checked',
    },
    {
      name: 'senderNumber',
      label: '发送人号码',
      field: {
        type: 'inputnumber',
        props: {
          placeholder: '请输入发送人号码',
          style: {
            width: '80%',
          },
        },
      },
      rules: [
        {
          required: true,
          message: '该项为必填项',
        },
      ],
    },
    {
      name: 'senderAddress',
      label: '发送人地址',
      field: {
        type: 'textarea',
        props: {
          placeholder: '发送人地址',
        },
      },
      rules: [
        {
          required: true,
          message: '该项为必填项',
        },
      ],
    },
    {
      name: 'recipientName',
      label: '接收人姓名',
      field: {
        type: 'select',
        props: {
          placeholder: '请选择接收人姓名',
        },
      },
      remoteSource: {
        url:
          'https://www.easy-mock.com/mock/5f9e6df90bf9ee0300940a04/api/manage/recipientList',
      },
      rules: [
        {
          required: true,
          message: '该项为必填项',
        },
      ],
    },
    {
      name: 'recipientTime',
      label: '接收时间',
      field: {
        type: 'checkboxgroup',
      },
      initialSource: [
        {
          text: 'Morning',
          value: 'morning',
        },
        {
          text: 'Afternoon',
          value: 'afternoon',
        },
        {
          text: 'Night',
          value: 'night',
        },
      ],
    },
    {
      name: 'recipientNumber',
      label: '接收人号码',
      field: {
        type: 'inputnumber',
        props: {
          placeholder: '请输入接收人号码',
          style: {
            width: '80%',
          },
        },
      },
      rules: [
        {
          required: true,
          message: '该项为必填项',
        },
      ],
    },
    {
      name: 'recipientAddress',
      label: '接收人地址',
      field: {
        type: 'textarea',
        props: {
          placeholder: '请输入接收人地址',
        },
      },
      rules: [
        {
          required: true,
          message: '该项为必填项',
        },
      ],
    },
    {
      name: 'time',
      label: '送货时间',
      field: {
        type: 'rangepicker',
        props: {
          placeholder: ['开始时间', '结束时间'],
        },
      },
      rules: [
        {
          required: true,
          message: '该项为必填项',
        },
      ],
    },
    {
      name: 'priceProject',
      label: '价格保护',
      field: {
        type: 'slider',
        props: {
          min: 0,
          max: 1000,
          step: 100,
          dots: true,
        },
      },
      remoteSource: {
        url: '/api/manage/priceList.json',
      },
    },
    {
      name: 'description',
      label: '其他信息',
      field: {
        type: 'textarea',
        props: {
          placeholder: '请输入其他信息',
        },
      },
    },
  ],
  actionsRender: [
    {
      type: 'button',
      props: {
        type: 'primary',
        children: '提交',
      },
      action: [
        {
          url: 'https://www.mocky.io/v2/5ed7a8b63200001ad9274ab5',
          method: 'POST',
          params: ctx => {
            console.log(ctx, ctx.result, 'ctx');
            return { ...(ctx.result || {}) };
          },
        },
      ],
    },
    {
      type: 'button',
      props: {
        type: 'primary',
        children: 'validateFields提交',
      },
      action: [
        'validateFields',
        {
          url: 'https://www.mocky.io/v2/5ed7a8b63200001ad9274ab5',
          method: 'POST',
          params: ctx => {
            console.log(ctx, ctx.result, 'validateFields ctx');
            return { ...(ctx.result || {}) };
          },
        },
      ],
    },
  ],
  remoteValues: {
    url:
      'https://www.easy-mock.com/mock/5f9e6df90bf9ee0300940a04/api/manage/detail',
    method: 'post',
    params: {
      id: 19,
    },
  },
};

export default props => {
  const callback = value => {
    console.log(value);
  };

  return <DynamicForm {...config} callback={callback} />;
};
```

More skills for writing demo: https://d.umijs.org/guide/demo-principle
