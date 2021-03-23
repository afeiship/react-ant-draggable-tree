import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAntDraggableTree from '../src/main';
import './assets/style.scss';

class App extends React.Component {
  render() {
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-ant-draggable-tree">
        <ReactAntDraggableTree
          items={require('./assets/tree.json')}
          className="mb-5 has-text-white"
          onChange={(e) => {
            console.log('event onChange:', e.target.value);
          }}
        />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
