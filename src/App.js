import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { DISHES } from './shared/dishes';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
