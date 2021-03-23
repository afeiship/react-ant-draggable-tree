import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAntDraggableTree from '../src/main';
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
