import noop from '@jswork/noop';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactAntTree from '@jswork/react-ant-tree';
import NxTreeSearch from '@jswork/next-tree-search';
import nxTraverse from '@jswork/next-traverse';
import nxDeepClone from '@jswork/next-deep-clone';

const CLASS_NAME = 'react-ant-draggable-tree';
/* prettier-ignore */
const RETURN_TRUE = () => { return true; };

export default class ReactAntDraggableTree extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * The data source for tree.
     */
    items: PropTypes.array,
    /**
     * The unique id key.
     */
    uniqKey: PropTypes.string,
    /**
     * The change handler.
     */
    onChange: PropTypes.func,
    /**
     * When drag and drop validation passed.
     */
    dropValidate: PropTypes.func
  };

  static defaultProps = {
    uniqKey: 'value',
    items: [],
    dropValidate: RETURN_TRUE,
    onChange: noop
  };

  constructor(inProps) {
    super(inProps);
    this.state = {
      items: nxDeepClone(inProps.items)
    };
  }

  shouldComponentUpdate(inProps) {
    if (inProps.items !== this.props.items) {
      this.setState({ items: inProps.items });
    }
    return true;
  }

  handleDrop = (inEvent) => {
    const { dropValidate } = this.props;
    const sliced = [...this.state.items];
    if (dropValidate(inEvent)) {
      this.move(inEvent, sliced);
    }
  };

  move = (inEvent, data) => {
    const { uniqKey, onChange } = this.props;
    const isInNode = !inEvent.dropToGap;
    const dragKey = inEvent.dragNode.props.eventKey;
    const dropKey = inEvent.node.props.eventKey;
    const pos = inEvent.node.props.pos.split('-');
    const dragObj = NxTreeSearch.find(
      data,
      (_, item) => item[uniqKey] === dragKey
    );
    const dropPosition = inEvent.dropPosition - Number(pos[pos.length - 1]);
    const loop = (inData, inKey, inCallback) => {
      inData.forEach((item, index, inArray) => {
        if (item[uniqKey] === inKey) {
          return inCallback(item, index, inArray);
        }
        if (item.children) {
          return loop(item.children, inKey, inCallback);
        }
      });
    };

    loop(data, dragObj[uniqKey], (_, index, arr) => {
      arr.splice(index, 1);
    });

    if (isInNode) {
      nxTraverse(data, (_, value) => {
        if (value[uniqKey] === dropKey) {
          value.children = value.children || [];
          value.children.push(dragObj);
        }
      });
    } else {
      let ar, i;
      loop(data, dropKey, (_, index, arr) => {
        ar = arr;
        i = index;
      });

      const idx = dropPosition === -1 ? i : i + 1;
      ar.splice(idx, 0, dragObj);
    }

    this.setState({ items: data }, () => {
      onChange({ target: { value: data } });
    });
  };

  render() {
    const {
      className,
      items,
      uniqKey,
      dropValidate,
      onChange,
      ...props
    } = this.props;

    return (
      <ReactAntTree
        draggable
        onDrop={this.handleDrop}
        items={this.state.items}
        {...props}
      />
    );
  }
}
