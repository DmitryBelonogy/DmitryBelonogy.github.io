const initialState = {
	dumpFigure: '',
	my: [],
	enemy: []
};

export default function reserve(state = initialState, action) {
	if (action.type === 'ADD_TO_RESERVE') {
		let newState = {...state};
		let re = /e/gi;
		let data = action.payload.replace(re, 'm');
		newState.my.push(data.substring(0,2));
		return newState;
	}
	if (action.type === 'ADD_DUMP_FIGURE') {
		let newState = {...state};
		newState.dumpFigure = action.payload;
		return newState;
	}
	if (action.type === 'REMOVE_FIGURE') {
		console.log(action.payload);
		let newState = {...state};
		let index = newState.my.indexOf(action.payload);
		newState.my.splice(index, 1);
		newState.dumpFigure = '';
		return newState;
	}
	if (action.type === 'ADD_DATA_FROM_DB') {
		let DBState = action.payload;
		let newState = {...state};
		if(DBState){
			newState.my = DBState.reserve.enemy;
			newState.enemy = DBState.reserve.my;
			for (let i = 0; i <= newState.my.length - 1 ; i++) {
				newState.my[i] = newState.my[i].replace('e', 'm');			
			}
			for (let i = 0; i <= newState.enemy.length - 1 ; i++) {
				newState.enemy[i] = newState.enemy[i].replace('m', 'e');			
			}
			return newState;
		}		
	}
	return state;
}