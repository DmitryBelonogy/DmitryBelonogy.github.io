const initialState = [];

export default function chat(state = initialState, action) {
	if (action.type === 'ADD_MESSAGE') {
    let newState = [...state];
    newState.push(action.payload)  
		return newState;
	}
	if (action.type === 'GET_MESSAGES') {
    if(action.payload.length !== state.length) {
      let messages = action.payload.map(item => {
        if(item.indexOf('my_') !== -1) {
          return item.substring(3);
        } else if(item.indexOf('my_') === -1) {
          return 'my_' + item;
        }
      });
      return messages;
    }    
	}
	return state;
}