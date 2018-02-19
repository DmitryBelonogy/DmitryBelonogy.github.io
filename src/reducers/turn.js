const initialState = true;

export default function turn(state = initialState, action) {
	if (action.type === 'CHANGE_TURN') {
		let newState = !state;
		return newState;
	}
	if (action.type === 'FIRST_START') {
		if(action.payload >= 1) {
			let newState = false;
			return newState;
		}
	}
	return state;
}