import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router,	Route,	Link, Redirect } from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';
import reducer from './reducers';
import Board from './components/Board';
import StartPage from './components/StartPage';
import './App.css';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

class Game extends Component {

  render(){
    return (      
      <div className="App">
      <Beforeunload onBeforeunload={() => console.log('bye')}>
        <Board />
      </Beforeunload>        
      </div>      
    );
  }
}

class App extends Component {
  render() {
    return(
      <Provider store={store}>      
        <Router>
          <div>        
            <Route path="/start_page" component={StartPage}/>
            <Route path="/game" component={Game}/>
            <Redirect from="" to="/start_page"/>
          </div>
        </Router>
      </Provider>      
    )       
  }
}

export default App;
