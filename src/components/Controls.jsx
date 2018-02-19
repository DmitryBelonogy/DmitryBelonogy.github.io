import React, { Component } from 'react';
import { database } from '../firebase/dataBase';
import Rules from './Rules';
import './Controls.css';

class Controls extends Component {

  constructor(){
    super();
    this.state = {showRules: false};
  }

  toggleRules = () => {
    this.setState({
      showRules: !this.state.showRules
    });
  }

  newGameButton = () => {
    return new Promise((resolve, reject) => {
      let data = "{\"items\":[[\"Le\",\"He\",\"Se\",\"Ge\",\"Ke\",\"Ge\",\"Se\",\"He\",\"Le\"],[\"\",\"Re\",\"\",\"\",\"\",\"\",\"\",\"Be\",\"\"],[\"Pe\",\"Pe\",\"Pe\",\"Pe\",\"Pe\",\"Pe\",\"Pe\",\"Pe\",\"Pe\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"Pm\",\"Pm\",\"Pm\",\"Pm\",\"Pm\",\"Pm\",\"Pm\",\"Pm\",\"Pm\"],[\"\",\"Bm\",\"\",\"\",\"\",\"\",\"\",\"Rm\",\"\"],[\"Lm\",\"Hm\",\"Sm\",\"Gm\",\"Km\",\"Gm\",\"Sm\",\"Hm\",\"Lm\"]],\"reserve\":{\"dumpFigure\":\"\",\"my\":[],\"enemy\":[]}}";
      let ref = database.ref('/boardState');
      if(ref) {
        resolve(ref.set(data));
      } else {
        reject(console.log('add data failed'));
      }
    })
  }

  exitButton = () => {
    this.newGameButton();
    database.ref('/startPage').once('value', (snapshot) => {
      let data = snapshot.val();
      return new Promise((resolve, reject) => {        
        let ref = database.ref('/startPage');
        if(ref) {
          resolve(ref.set(data - 1));
          window.location.href = '/start_page';
        } else {
          reject(console.log('add data failed'));
        }
      })
    });
    database.ref('/chat').once('value', (snapshot) => {
      return new Promise((resolve, reject) => {        
        let ref = database.ref('/chat');
        if(ref) {
          resolve(ref.set("[]"));
        } else {
          reject(console.log('add data failed'));
        }
      })
    })
  }

  render(){
    return(
      <div>
        <div className={this.state.showRules ? 'fusuma_left' : 'fusuma_left_hide'}></div>
        <div className='controls'>        
          <button className='newGame' onClick={this.newGameButton}>Новая игра</button>
          <button className='Exit' onClick={this.exitButton}>Выйти из игры</button>
          <button className='Rules' onClick={this.toggleRules}>Правила сёги</button>        
        </div>
        <div className={this.state.showRules ? 'fusuma_right' : 'fusuma_right_hide'}></div>
        <div className={this.state.showRules ? 'show_rules' : 'hide_rules'}>
          <Rules />
        </div>
      </div>
    )
  }
}

export default Controls;
