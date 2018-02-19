import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router,	Route,	Link, Redirect } from 'react-router-dom';
import { database } from '../firebase/dataBase';
import './StartPage.css';

class StartPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      intro: '',
      count: null
    };
  }

  componentWillMount(){
    database.ref('/startPage').once('value', (snapshot) => {
      let data = snapshot.val();
      if(data === 0){
        this.props.onFirstStart(data);
        this.setState({
          intro: 'Начать игру',
          count: data
        });
      } else if (data === 1){
        this.props.onFirstStart(data);
        this.setState({
          intro: 'Присоединиться к игре',
          count: data
        });
      } else {
        this.setState({
          intro: 'Свободных мест нет',
          count: data
        });
      }
    })
  }

  changeCountDB = () => {
    new Promise((resolve, reject) => {
      let ref = database.ref('/startPage');
      if(ref) {
        resolve(ref.set(this.state.count + 1));
      } else {
        reject(console.log('add data failed'));
      }
    })
  }
  
  render(){
    if(this.state.count <= 1){
      return(
        <div className='start_page'>
          <Link id="start_link" to="/game" onClick={this.changeCountDB}>{this.state.intro}</Link>
        </div>     
      )    
    } else {
      return(
        <div className='start_page'>
          <a id="start_link">{this.state.intro}</a>
        </div>
      )
    }   
    
  }
}

export default connect(
	state => ({
		store: state
  }),
  dispatch => ({
    onFirstStart: (data) => {
      dispatch({type: 'FIRST_START', payload: data})
    },
	})
)(StartPage);