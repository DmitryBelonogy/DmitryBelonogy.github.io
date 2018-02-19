import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TurnIndicate.css';

class TurnIndicate extends Component {
  render(){
    return(
      <div className='turnIndicate'>
        <span unload={alert('by')}>{this.props.store ? 'Ваш ход' : 'Ход противника'}</span>
      </div>
    )
  }
}

export default connect(
	state => ({
		store: state.turn
	}),
	dispatch => ({
		
	})
)(TurnIndicate);