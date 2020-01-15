import React from 'react';
import './App.css';
import Bridge from './bridge/core.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { btnText: '点击按钮' };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <text>这是react渲染的网页<br />{this.state.btnText}</text>
          <button onClick={() => this.test()}>
            Test
          </button>
        </header>
      </div>
    )
  }

  showCount = (result) => {
    this.setState({
      btnText: result.data
    })
  }

  test = ()=> {
    var msg = {}
    msg.name = 'jump'
    msg.params = { url: 'notice/device' }
    var result = Bridge.open(msg, '')
    this.setState({
      btnText: JSON.parse(result).data
    })
  }

}

export default App;