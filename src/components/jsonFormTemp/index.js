import React, { useState, useEffect } from 'react';
import { CreateForm, StepForm } from 'sula';
import { merge, set, unset, get } from 'lodash';
import { triggerRenderPlugin } from 'sula/es/rope/triggerPlugin';
import { Button } from 'antd';
import getFormMode from '../../utils/getFormMode';
import FormDrawer from './component/formDrawer';
import ControlDrawer from '../jsonEditorDrawer';
import TipsWrapper from '../tipsWrapper';

export default props => {
  const {
    callback,
    history,
    location,
    match,
    staticContext,
    computedMatch,
    route,
    children,
    routes,
    ...config
  } = props;
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState(config); // 全局代码，透传给Form组件 纯json
  const [mode, setMode] = useState(getFormMode(props));
  const [direction, setDirection] = useState('horizontal');
  const [actionsPosition, setActionsPosition] = useState(
    config.actionsPosition,
  );
  const [flag, setFlag] = useState([0]);
  const [controlValue, setControlValue] = useState({}); // 局部控制jsonEditor的value
  const [key, setKey] = useState(0);
  const [clickType, setClickType] = useState('');
  const [init, setInit] = useState(false);

  function deleteItem(path) {
    const finalCode = { ...code };
    if (Array.isArray(path) && path.length && path[0] === 'actionsRender') {
      unset(finalCode.actionsRender, [mode, path[1]]);
    } else {
      unset(finalCode, path);
    }

    setCode(finalCode);
    setKey(key + 1);
  }

  function addItem(name, path, position = 'left') {
    let finalCode = { ...code };
    const nodePath = path.slice(0, -1);
    let node;
    if (
      Array.isArray(nodePath) &&
      nodePath.length &&
      nodePath[0] === 'actionsRender'
    ) {
      node = code.actionsRender[mode];
    } else {
      node = get(finalCode, nodePath);
    }
    const idx = node.length + 1;

    let defaultCode;
    switch (name) {
      case 'fields':
        defaultCode = {
          name: 'input' + idx,
          label: 'input' + idx,
          field: 'input',
        };
        break;

      case 'actionsRender':
        defaultCode = {
          type: 'button',
          props: {
            children: '按钮' + idx,
            type: 'primary',
          },
        };
        break;
      default:
        return;
    }
    node.splice(
      position === 'left' ? path[path.length - 1] : path[path.length - 1] + 1,
      0,
      defaultCode,
    );

    if (
      Array.isArray(nodePath) &&
      nodePath.length &&
      nodePath[0] === 'actionsRender'
    ) {
      const actionflag = Object.assign([], nodePath);
      actionflag[0] = mode;
      const actionNewVal = set({ ...code.actionsRender }, actionflag, node);
      finalCode = set(finalCode, nodePath, actionNewVal);
    } else {
      finalCode = set(finalCode, nodePath, node);
    }

    setCode(finalCode);
    setKey(key + 1);
  }

  const isWizard = !!(code && code.steps);

  const getLabel = (data, path) => {
    return (
      <TipsWrapper
        key={path.join('-')}
        title={data.label}
        onSet={() => {
          setControlValue(data);
          setFlag(path);
          setVisible(true);
          setClickType('form');
        }}
        onDelete={() => {
          deleteItem(path);
        }}
        onAddBefore={() => {
          addItem('fields', path);
        }}
        onAddAfter={() => {
          addItem('fields', path, 'right');
        }}
      >
        {data.label}
      </TipsWrapper>
    );
  };

  const getLabelFields = (data, arr = []) => {
    if (!data) return [];
    return data.map((v, idx) => {
      const { fields, steps } = v;
      if (fields) {
        return {
          ...v,
          fields: getLabelFields(fields, [...arr, idx, 'fields']),
        };
      }

      if (steps) {
        return {
          ...v,
          steps: getLabelFields(steps, [...arr, idx, 'steps']),
        };
      }

      return {
        ...v,
        label: getLabel(v, [...arr, idx]),
      };
    });
  };

  const getFieldsConfig = data => {
    const { steps, fields } = data;
    return isWizard
      ? { steps: getLabelFields(steps, ['steps']) }
      : { fields: getLabelFields(fields, ['fields']) };
  };

  const [labelCode, setLabelCode] = useState({
    ...code,
    ...getFieldsConfig(config),
  });

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    const newLabelCode = { ...code };
    setLabelCode({ ...newLabelCode, ...getFieldsConfig(code) });
    if (init) {
      setKey(key + 1);
    }
  }, [code]);

  // 给个靠后点默认id，防止前面删掉后无数据
  const id = 0;

  const handleDo = val => {
    setCode(val);
    setFormDrawerVisible(false);
  };

  const remoteValues = {};

  const Comp = isWizard ? StepForm : CreateForm;

  const onRun = val => {
    const { name: oldName } = controlValue;
    const { name, ...restVal } = { ...val };
    const newVal = oldName ? { name: oldName, ...restVal } : val;

    let finalCode = { ...code };
    if (Array.isArray(flag) && flag.length && flag[0] === 'actionsRender') {
      const actionflag = Object.assign([], flag);
      actionflag[0] = mode;
      const actionNewVal = set({ ...code.actionsRender }, actionflag, newVal);
      finalCode = set(finalCode, flag, actionNewVal);
      debugger;
    } else {
      finalCode = set(finalCode, flag, newVal);
    }

    setCode(finalCode);

    setVisible(false);
    setKey(key + 1);
  };

  const onModeChange = mode => {
    setMode(mode);
    setCode({ ...code, mode: mode });
    setFormDrawerVisible(false);
    setKey(key + 1);
  };

  const onDirectionChange = direction => {
    setDirection(direction);
    setFormDrawerVisible(false);
    setKey(key + 1);
  };

  const onActionsPositionChange = position => {
    setActionsPosition(position);
    setFormDrawerVisible(false);
    setKey(key + 1);
  };

  const onControlTipClick = (data, namePath) => {
    if (
      Array.isArray(namePath) &&
      namePath.length &&
      namePath[0] === 'actionsRender'
    ) {
      data = code.actionsRender[mode][namePath[1]];
    }
    setControlValue(data);
    setFlag(namePath);
    setVisible(true);
    setClickType('actions');
  };

  const getClickItem = (data, name) => {
    const finalActions = data.map((action, idx) => {
      return {
        type: ctx => {
          const children = triggerRenderPlugin(ctx, action);
          const path = [name, idx];
          return (
            <TipsWrapper
              onSet={() => onControlTipClick(action, path)}
              onDelete={() => {
                deleteItem(path);
              }}
              onAddBefore={() => {
                addItem('actionsRender', path);
              }}
              onAddAfter={() => {
                addItem('actionsRender', path, 'right');
              }}
            >
              {children}
            </TipsWrapper>
          );
        },
      };
    });

    return finalActions;
  };

  const getActionConfig = data => {
    const { actionsRender, ...restProps } = { ...data };
    if (!actionsRender) return data;
    return {
      ...restProps,
      actionsRender: getClickItem(actionsRender[mode] || [], 'actionsRender'),
    };
  };

  const wizardDirection = isWizard ? { direction } : {};

  const finalConfig = merge(
    getActionConfig(labelCode),
    { remoteValues },
    wizardDirection,
  );

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          callback(code);
        }}
      >
        保存
      </Button>
      <Comp
        {...finalConfig}
        mode={mode}
        actionsPosition={actionsPosition}
        key={key}
      />
      <FormDrawer
        mode={(code && code.mode) || mode}
        id={id}
        direction={direction}
        visible={formDrawerVisible}
        iconVisible={visible}
        onClick={() => setFormDrawerVisible(true)}
        onClose={() => setFormDrawerVisible(false)}
        onRun={handleDo}
        code={code}
        changeMode={onModeChange}
        changeDirection={onDirectionChange}
        isWizard={isWizard}
        actionsPosition={actionsPosition}
        changeActionsPosition={onActionsPositionChange}
        width="900px"
      />
      <ControlDrawer
        clickType={clickType}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={controlValue}
        onRun={onRun}
      />
    </div>
  );
};

const filterAction = (code, mode) => {
  return { ...code, actionsRender: code.actionsRender[mode] };
};
