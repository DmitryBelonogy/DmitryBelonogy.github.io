import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Chat.css';
import { database } from '../firebase/dataBase';

let ChatText = ({item , index}) => {
  let className;
  if(item.indexOf('my_') === -1) {
    className = 'enemyText'
  } else if(item.indexOf('my_') !== -1) {
    className = 'myText';
    item = item.substring(3);
  }
  return(
    <p className={className}>{item}</p>
  )
}

class Chat extends Component {

  addMessage = (event) => {
    event.preventDefault();
    let message = 'my_' + this.messageInput.value;
    this.props.onAddMessage(message);        
    this.messageInput.value = '';
    new Promise((resolve, reject) => {
      let ref = database.ref('/chat');
      if(ref) {
        resolve(ref.set(JSON.stringify([...this.props.store, message])));
      } else {
        reject(console.log('add data failed'));
      }
    });
  }
  
  render() {
    return(
      <div className='chat'>
        <div className='text' id='text'>
          {
            this.props.store.map((item, index) =>
              <ChatText item={item} key={index} />
            )
          }
        </div>
        <form onSubmit={this.addMessage}>
          <input type="text" className='message' ref={(input) => {this.messageInput = input}}/>
        </form>
      </div>
    )
  }
}

export default connect(
	state => ({
		store: state.chat
  }),
  dispatch => ({		
    onAddMessage: (data) => {
      dispatch({type: 'ADD_MESSAGE', payload: data})
    },
    onGetMessages: (data) => {
      dispatch({type: 'GET_MESSAGES', payload: data})
    }
	})
)(Chat);