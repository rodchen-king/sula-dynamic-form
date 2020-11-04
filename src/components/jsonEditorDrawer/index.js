/*
 * @Description:
 * @Author: rodchen
 * @Date: 2020-11-04 16:42:58
 * @LastEditTime: 2020-11-04 19:27:04
 * @LastEditors: rodchen
 */
import React from 'react';
import Drawer from '../drawer';
import JsonEditor from '../jsonEditor';
import PluginTree from '../pluginTree';

export default props => {
  const { visible, onClose, value, onRun, clickType } = props;
  const [pluginType, setPluginType] = React.useState(clickType);
  const [editorValue, setEditorValue] = React.useState(value);
  const [isFull, setFull] = React.useState(false);

  React.useEffect(() => {
    setPluginType(clickType);
  }, [clickType]);

  React.useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const isColumnsType = clickType === 'columns';

  const handleChangeEditorValue = (code, isAction) => {
    if (isColumnsType || isAction) {
      setEditorValue({
        ...editorValue,
        ...code,
      });
      return;
    }

    const { name, label, action } = editorValue;
    setEditorValue({
      ...(name ? { name } : {}),
      ...(label ? { label } : {}),
      ...code,
      ...(action ? { action } : {}),
    });
  };

  return (
    <div>
      <Drawer visible={visible} width={600} closable={false} onClose={onClose}>
        <JsonEditor
          type="editor"
          value={editorValue}
          onRun={onRun}
          onFullScreen={setFull}
        />
      </Drawer>
      <Drawer
        style={{ display: isFull ? 'none' : '' }}
        placement="left"
        mask={false}
        visible={visible}
        width={400}
        onClose={onClose}
      >
        <PluginTree
          key={pluginType}
          type={clickType}
          onEditorValueChange={handleChangeEditorValue}
          hasField={!!editorValue?.field}
          isColumnsType={isColumnsType}
        />
      </Drawer>
    </div>
  );
};
