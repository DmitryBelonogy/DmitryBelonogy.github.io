import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoarCell from './BoardCell';

class BoardRow extends Component {
  render() {
    return (
      <div className='boardRow'>
        {
          this.props.store[this.props.index].map((item, index) => <BoarCell key={index} figureType={item} />)
        }
      </div>
    )
  }
}

export default connect(
	state => ({
		store: state.items
	})
)(BoardRow);