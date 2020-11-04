/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-04 16:42:58
 * @LastEditTime: 2020-11-04 20:08:25
 * @LastEditors: rodchen
 */
import React, { useState } from 'react';
import { message } from 'antd';
import Drawer from '../../drawer';
import ConfigButton from '../../configButton';
import Editor from '../../jsonEditor';

const tableStyleList = [
  {
    type: '快速搜索',
    img: 'https://img.alicdn.com/tfs/TB1al1JqHr1gK0jSZR0XXbP8XXa-40-40.svg',
    url: '/list/singlesearch',
  },
  {
    type: '高级搜索',
    img: 'https://img.alicdn.com/tfs/TB1QgKIqQL0gK0jSZFtXXXQCXXa-40-40.svg',
    url: '/list/advancedsearch',
  },
  {
    type: '一般搜索',
    img: 'https://img.alicdn.com/tfs/TB1xHCPqRr0gK0jSZFnXXbRRXXa-40-40.svg',
    url: '/list/basic',
  },
  {
    type: '无分页表格',
    img: 'https://img.alicdn.com/tfs/TB1txuMqQL0gK0jSZFxXXXWHVXa-40-40.svg',
    url: '/list/nopagination',
  },
  {
    type: '分步查询表格',
    img: 'https://img.alicdn.com/tfs/TB10IOmGkL0gK0jSZFAXXcA9pXa-53-46.svg',
    url: '/list/stepquerytable',
  },
];

export default React.memo(props => {
  const {
    width = 600,
    visible,
    onClick,
    onClose,
    onRun,
    code: defaultCode,
    iconVisible,
  } = props;
  const [code, setCode] = useState(defaultCode);
  const [init, setInit] = useState(false);
  const [jsonEditorVal, setJsonEditorVal] = useState(defaultCode);
  const styleRef = React.useRef(null);

  React.useEffect(() => {
    setInit(true);
  }, []);

  const onClickRun = value => {
    setJsonEditorVal(value);
    try {
      setCode(value);
    } catch (e) {
      message.error('JSON 格式错误');
    }
  };

  React.useEffect(() => {
    if (init) {
      onRun(code);
    }
  }, [code]);

  const height =
    styleRef?.current?.clientHeight || styleRef?.current?.offsetHeight;

  return (
    <div>
      <Drawer visible={visible} width={width} onClose={onClose}>
        <div ref={styleRef}></div>

        <Editor
          type="table"
          onRun={onClickRun}
          value={jsonEditorVal}
          shallowHeight={height}
        />
      </Drawer>

      {!visible && !iconVisible && <ConfigButton onClick={onClick} />}
    </div>
  );
});
