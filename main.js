import { createElement, render, Component } from './toy-react.js';

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: 'xuwanwan nb+',
      data: 1
    };
  }

  render() {
    return (
      <div>
        <div>{this.state.name}<span>{this.state.data.toString()}</span></div>
        <button onClick={() => { this.setState({ data: this.state.data + 1 }) }}>点我</button>
        {this.children}
      </div>
    )
  }
};

let a = (
  <MyComponent className={'active'} id={'root'}>
    <div className={'item'} >1</div>
    <div className={'item'} >2</div>
    <div className={'item'} >3</div>
  </MyComponent>
);

render(a, document.querySelector('#root'));