import React, { Component } from 'react';
import { connect } from 'react-redux';
import Figure from './figures/Figure';
import moveLogic from '../helpers/moveLogic';
import dumpLogic from '../helpers/dumpLogic';
import { database, addData } from '../firebase/dataBase';

let prevClick = null;

class BoarCell extends Component {
 
  activeFigure = (e) => {
    let x = e.pageX;
    let y = e.pageY;
    
    x = Math.floor(x/70) - 5;
    y = Math.floor(y/70);
    let currentClick = {
      x: x,
      y: y,
      typeFigure: this.props.store.items[y][x]
    };
    //dumping figure on board
    if(currentClick.typeFigure === '' && this.props.store.reserve.dumpFigure !== ''){
      let data = {
        currentClick: currentClick,
        dumpingFigure: this.props.store.reserve.dumpFigure
      }
      let boardState = this.props.store.items;
      if(dumpLogic(data, boardState)){        
        this.props.onRemoveFigure(this.props.store.reserve.dumpFigure);
        this.props.onDumpFigure(data);
        this.props.onChangeTurn();
        let boardState = {items: this.props.store.items, reserve: this.props.store.reserve};
        addData(boardState);
      }      
    }
    //move figure
    if(!prevClick) {
      prevClick = currentClick;
      return;
    } else {
      if(prevClick.typeFigure === '') {
        prevClick = null;
        return;
      }
      let data = {
        prevClick: prevClick,
        currentClick: currentClick
      }
      if(moveLogic(data, this.props.store.items)) {
        if(currentClick.typeFigure.indexOf('e') >= 0) {
          this.props.onAddToReserve(currentClick.typeFigure);
        }
        let data = {
          prevClick: prevClick,
          currentClick: currentClick
        }        
        this.props.onMoveFigure(data);
        this.props.onChangeTurn();
        let boardState = {items: this.props.store.items, reserve: this.props.store.reserve};
        addData(boardState);
        prevClick = null;
      }
      prevClick = null;
    }
  }

  render() {
    return (
      <div className='boardCell' onClick={this.activeFigure}>{this.props.figureType ? <Figure figureType={this.props.figureType} /> : ''}</div>
    )
  }  
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onMoveFigure: (data) => {
      dispatch({type: 'MOVE_FIGURE', payload: data})
    },
    onAddToReserve: (data) => {
      dispatch({type: 'ADD_TO_RESERVE', payload: data})
    },
    onDumpFigure: (data) => {
      dispatch({type: 'DUMP_FIGURE', payload: data})
    },
    onRemoveFigure: (data) => {
      dispatch({type: 'REMOVE_FIGURE', payload: data})
    },
    onChangeTurn: () => {
      dispatch({type: 'CHANGE_TURN'})
    }
	})
)(BoarCell);