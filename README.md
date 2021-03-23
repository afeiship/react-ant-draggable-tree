# react-ant-draggable-tree
> Draggable tree for antd.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-draggable-tree
```

## properties
| Name         | Type   | Required | Default                | Description                           |
| ------------ | ------ | -------- | ---------------------- | ------------------------------------- |
| className    | string | false    | -                      | The extended className for component. |
| items        | array  | false    | []                     | The data source for tree.             |
| uniqKey      | string | false    | 'value'                | The unique id key.                    |
| onChange     | func   | false    | noop                   | The change handler.                   |
| dropValidate | func   | false    | () => { return true; } | When drag and drop validation passed. |


## usage
1. import css
  ```scss
  @import "~@jswork/react-ant-draggable-tree/dist/style.css";

  // or use sass
  @import "~@jswork/react-ant-draggable-tree/dist/style.scss";

  // customize your styles:
  $react-ant-draggable-tree-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactAntDraggableTree from '@jswork/react-ant-draggable-tree';
  import './assets/style.scss';

  class App extends React.Component {
    state = {
      items: require('./assets/tree.json')
    };

    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-ant-draggable-tree">
          <ReactAntDraggableTree
            items={this.state.items}
            className="mb-5 has-text-white"
            onChange={(e) => {
              console.log('event onChange:', e.target.value);
            }}
          />
          <button
            className="button is-primary"
            onClick={(e) => {
              this.setState({ items: [] });
            }}>
            Set items
          </button>
        </ReactDemokit>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-ant-draggable-tree/


## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-draggable-tree/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-draggable-tree
[version-url]: https://npmjs.org/package/@jswork/react-ant-draggable-tree

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-draggable-tree
[license-url]: https://github.com/afeiship/react-ant-draggable-tree/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-draggable-tree
[size-url]: https://github.com/afeiship/react-ant-draggable-tree/blob/master/dist/react-ant-draggable-tree.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-draggable-tree
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-draggable-tree
