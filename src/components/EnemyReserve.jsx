import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reserve.css';
import Figure from './figures/Figure';

class EnemyReserveBoard extends Component {
  render() {
    return (
      <div className='reservBoard'>
        {
          this.props.store.enemy.map((item, index) => <Figure key={index} figureType={item} />)
        }
      </div>
    )
  }
}

export default connect(
	state => ({
		store: state.reserve
	})
)(EnemyReserveBoard);