const initialState = [
  ['Le','He','Se','Ge','Ke','Ge','Se','He','Le'],
  ['','Re','','','','','','Be',''],
  ['Pe','Pe','Pe','Pe','Pe','Pe','Pe','Pe','Pe'],
  ['','','','','','','','',''],
  ['','','','','','','','',''],
  ['','','','','','','','',''],
  ['Pm','Pm','Pm','Pm','Pm','Pm','Pm','Pm','Pm'],
  ['','Bm','','','','','','Rm',''],
  ['Lm','Hm','Sm','Gm','Km','Gm','Sm','Hm','Lm'],
];

export default function items(state = initialState, action) {
	if (action.type === 'MOVE_FIGURE') {
    let newState = [...state];
    newState[action.payload.prevClick.y][action.payload.prevClick.x] = '';
    if(action.payload.currentClick.y <= 2 && action.payload.prevClick.typeFigure.indexOf('T') < 0){
			newState[action.payload.currentClick.y][action.payload.currentClick.x] = action.payload.prevClick.typeFigure + 'T';
			
    } else {
			newState[action.payload.currentClick.y][action.payload.currentClick.x] = action.payload.prevClick.typeFigure;
    }    
    return newState; 
	}
	if (action.type === 'DUMP_FIGURE') {
		let newState = [...state];
		newState[action.payload.currentClick.y][action.payload.currentClick.x] = action.payload.dumpingFigure;
		return newState; 
	}
	if (action.type === 'CHANGE_TURN') {
		
	}
	if (action.type === 'ADD_DATA_FROM_DB') {
		let DBState = action.payload;
		if(DBState){
			for (let i = 0; i <= 8; i++) {
				for (let j = 0; j <= 8; j++) {
					if(DBState.items[i][j].indexOf('e') >=0){
						DBState.items[i][j] = DBState.items[i][j].replace('e', 'm');
						continue;
					}
					if(DBState.items[i][j].indexOf('m') >=0){
						DBState.items[i][j] = DBState.items[i][j].replace('m', 'e');
						continue;
					}
				}			
			}		
			DBState.items.map(item => item.reverse());
			DBState.items.reverse();
			return DBState.items;
		}
	}
	return state;
}