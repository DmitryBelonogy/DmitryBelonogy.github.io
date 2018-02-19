import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Reserve.css';
import Figure from './figures/Figure';

let prevClick = null;

class MyReserveBoard extends Component {

  dumpFigure = (e) => {
    if(e.target.className === 'reservBoard'){
      return;
    }
    let dumpingFigureType = e.target.className;
    this.props.onAddDumpFigure(dumpingFigureType + 'm');
  }

  render() {
    return (
      <div className='reservBoard' onClick={this.dumpFigure}>
        {
          this.props.store.my.map((item, index) => <Figure key={index} figureType={item} />)
        }
      </div>
    )
  }
}

export default connect(
	state => ({
		store: state.reserve
  }),
  dispatch => ({
		onAddDumpFigure: (data) => {
      dispatch({type: 'ADD_DUMP_FIGURE', payload: data})
    }
	})
)(MyReserveBoard);