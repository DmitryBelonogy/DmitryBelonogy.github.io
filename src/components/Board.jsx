import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Board.css';
import BoardRow from './BoardRow';
import MyReserveBoard from './MyReserve';
import EnemyReserveBoard from './EnemyReserve';
import TurnIndicate from './TurnIndicate';
import Controls from './Controls';
import Chat from './Chat';
import { database } from '../firebase/dataBase';

class Board extends Component {

  componentWillMount(){
    database.ref('/boardState').on('value', (snapshot) => {
      let data = snapshot.val();
      let currentState = JSON.stringify({items: this.props.store.items, reserve: this.props.store.reserve});		
      if(data && currentState !== data){
        data = JSON.parse(data);
        this.props.onAddDataFromDB(data);
        this.props.onChangeTurn();
      } else {
        console.log('данные не обновились');
      }
    });
    database.ref('/chat').on('value', (snapshot) => {
      let data = snapshot.val();
      data = JSON.parse(data);
      this.props.onGetMessages(data);
    });
  }
  
  render() {
    return (
      <div className='wrapper'>
        <TurnIndicate />
        <EnemyReserveBoard />
        <Controls />
        <div className={this.props.store.turn ? 'activeBoard' : 'disactiveBoard'}></div>
        <div className='mainBoard'>
          {
            this.props.store.items.map((item, index) => <BoardRow key={index} index={index} />)
          }
        </div>
        <MyReserveBoard />
        <Chat />  
      </div>
          
    )
  }
}

export default connect(
	state => ({
		store: state
  }),
  dispatch => ({		
    onAddDataFromDB: (data) => {
      dispatch({type: 'ADD_DATA_FROM_DB', payload: data})
    },
    onChangeTurn: () => {
      dispatch({type: 'CHANGE_TURN'})
    },
    onFirstStart: (data) => {
      dispatch({type: 'FIRST_START', payload: data})
    },
    onGetMessages: (data) => {
      dispatch({type: 'GET_MESSAGES', payload: data})
    }
	})
)(Board);