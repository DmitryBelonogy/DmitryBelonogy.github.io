import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Figure.css';

class Figure extends Component {

  render() {
    let type = this.props.figureType;
    let className;
    if(type.indexOf('T') < 0){
      className = type.substring(0,1);
    }else if(type.indexOf('T') >= 0){
      className = 'T' + type.substring(0,1);
    }  
    return (
      <div className={this.props.figureType.indexOf('e') > 0 ? 'figure enemy' : 'figure'} onClick={this.activeFigure}>
        <div className={className}></div>
      </div>
    )
  }
}

export default connect(
	state => ({
		store: state.items
	}),
	dispatch => ({
		
	})
)(Figure);