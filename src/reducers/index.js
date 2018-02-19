import { combineReducers } from 'redux';
import items from './items';
import reserve from './reserve';
import turn from './turn';
import chat from './chat'

export default combineReducers({
	items,
	reserve,
	turn,
	chat
})