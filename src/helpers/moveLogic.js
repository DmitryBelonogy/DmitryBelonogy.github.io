let moveLogic = (data, store) => {
  let prevClick = data.prevClick;
  let currentClick = data.currentClick;
  switch (prevClick.typeFigure) {
    case 'Pm': 
      if(currentClick.y === prevClick.y - 1 
        && currentClick.x === prevClick.x
        && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
        return true
      }
      break;
    case 'Sm':
      if(((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x )
        || ((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x + 1 ))
        || ((currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x + 1 )))
        && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
        return true
      }
      break;
    case 'Hm':
      if(((currentClick.y === prevClick.y - 2 && currentClick.x === prevClick.x - 1) || (currentClick.y === prevClick.y - 2 && currentClick.x === prevClick.x + 1))
        && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
        return true
      }
      break;
    case 'Gm':
      if((((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x ) || currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x )
        || ((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x + 1 ))
        || ((currentClick.y === prevClick.y && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y && currentClick.x === prevClick.x + 1 )))
        && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
        return true
      }
      break;
    case 'Km':
      if((((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x ) || currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x )
        || ((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x + 1 ))
        || ((currentClick.y === prevClick.y && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y && currentClick.x === prevClick.x + 1 ))
        || ((currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x + 1 )))
        && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
        return true
      }
      break;
    case 'Lm':
      let move = true;      
      for(let i = prevClick.y - 1; i >= currentClick.y + 1; i--) {        
        if(store[i][currentClick.x] !== '' || store[i - 1][currentClick.x].indexOf('m') >= 0){
          move = false;
        }
      }
      if(currentClick.typeFigure.indexOf('m') >= 0){
        move = false;          
      }
      if(currentClick.y > prevClick.y) {
        move = false;
      }
      if(currentClick.x !== prevClick.x){
        move = false;
      }
      return move;
      break;
    case 'Rm':
      {
        let move = true;
        if(currentClick.x === prevClick.x && currentClick.y > prevClick.y){
          for(let i = prevClick.y + 1; i <= currentClick.y - 1; i++) {        
            if(store[i][currentClick.x] !== '' || store[i + 1][currentClick.x].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
          
        } else if(currentClick.x === prevClick.x && currentClick.y < prevClick.y){
          for(let i = prevClick.y - 1; i >= currentClick.y + 1; i--) {        
            if(store[i][currentClick.x] !== '' || store[i - 1][currentClick.x].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(currentClick.y === prevClick.y && currentClick.x > prevClick.x){
          for(let i = prevClick.x + 1; i <= currentClick.x - 1; i++) {        
            if(store[currentClick.y][i] !== '' || store[currentClick.y][i + 1].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(currentClick.y === prevClick.y && currentClick.x < prevClick.x){
          for(let i = prevClick.x - 1; i >= currentClick.x + 1; i--) {        
            if(store[currentClick.y][i] !== '' || store[currentClick.y][i - 1].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else {
          move = false;
        }
        return move;        
        break;
      }
    case 'Bm':
      {
        let move = true;
        if(prevClick.x < currentClick.x && prevClick.y > currentClick.y){
          if(prevClick.y - currentClick.y !== currentClick.x - prevClick.x){
            move = false;
          }
          for(let i = 1; i < (currentClick.x - prevClick.x); i++){
            if(store[prevClick.y - i][prevClick.x + i] !== '' || store[currentClick.y + 1][currentClick.x - 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(prevClick.x > currentClick.x && prevClick.y > currentClick.y){
          if(prevClick.y - currentClick.y !== prevClick.x - currentClick.x ){
            move = false;
          }
          for(let i = 1; i < (prevClick.x - currentClick.x); i++){
            if(store[prevClick.y - i][prevClick.x - i] !== '' || store[currentClick.y + 1][currentClick.x + 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(prevClick.x < currentClick.x && prevClick.y < currentClick.y){
          if(currentClick.y - prevClick.y !== currentClick.x - prevClick.x){
            move = false;
          }
          for(let i = 1; i < (currentClick.x - prevClick.x); i++){
            if(store[prevClick.y + i][prevClick.x + i] !== '' || store[currentClick.y - 1][currentClick.x - 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(prevClick.x > currentClick.x && prevClick.y < currentClick.y){
          if(currentClick.y - prevClick.y !== prevClick.x - currentClick.x){
            move = false;
          }
          for(let i = 1; i < (prevClick.x - currentClick.x); i++){
            if(store[prevClick.y + i][prevClick.x - i] !== '' || store[currentClick.y - 1][currentClick.x + 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else {
          move = false;
        }
        return move;        
        break;
      }
    case 'PmT':
    case 'LmT':
    case 'HmT':
    case 'SmT':
      if(currentClick.typeFigure.indexOf('m') >= 0){
        return false;
      }
      if((((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x ) || currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x )
        || ((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x + 1 ))
        || ((currentClick.y === prevClick.y && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y && currentClick.x === prevClick.x + 1 )))
        && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
        return true
      }
      break;
    case 'BmT':
      {
        let move = true;
        if(prevClick.x < currentClick.x && prevClick.y > currentClick.y){
          if(prevClick.y - currentClick.y !== currentClick.x - prevClick.x){
            move = false;
          }
          for(let i = 1; i < (currentClick.x - prevClick.x); i++){
            if(store[prevClick.y - i][prevClick.x + i] !== '' || store[currentClick.y + 1][currentClick.x - 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(prevClick.x > currentClick.x && prevClick.y > currentClick.y){
          if(prevClick.y - currentClick.y !== prevClick.x - currentClick.x ){
            move = false;
          }
          for(let i = 1; i < (prevClick.x - currentClick.x); i++){
            if(store[prevClick.y - i][prevClick.x - i] !== '' || store[currentClick.y + 1][currentClick.x + 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(prevClick.x < currentClick.x && prevClick.y < currentClick.y){
          if(currentClick.y - prevClick.y !== currentClick.x - prevClick.x){
            move = false;
          }
          for(let i = 1; i < (currentClick.x - prevClick.x); i++){
            if(store[prevClick.y + i][prevClick.x + i] !== '' || store[currentClick.y - 1][currentClick.x - 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(prevClick.x > currentClick.x && prevClick.y < currentClick.y){
          if(currentClick.y - prevClick.y !== prevClick.x - currentClick.x){
            move = false;
          }
          for(let i = 1; i < (prevClick.x - currentClick.x); i++){
            if(store[prevClick.y + i][prevClick.x - i] !== '' || store[currentClick.y - 1][currentClick.x + 1].indexOf('m') >= 0){ 
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else {
          move = false;
        }
        if(currentClick.typeFigure.indexOf('m') >= 0){
          return false;
        }
        if((((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x ) || currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x )
          || ((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x + 1 ))
          || ((currentClick.y === prevClick.y && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y && currentClick.x === prevClick.x + 1 )))
          && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
          move = true;
        }
        return move;        
        break;
      }
    case 'RmT':
      {
        let move = true;
        if(currentClick.x === prevClick.x && currentClick.y > prevClick.y){
          for(let i = prevClick.y + 1; i <= currentClick.y - 1; i++) {        
            if(store[i][currentClick.x] !== '' || store[i + 1][currentClick.x].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
          
        } else if(currentClick.x === prevClick.x && currentClick.y < prevClick.y){
          for(let i = prevClick.y - 1; i >= currentClick.y + 1; i--) {        
            if(store[i][currentClick.x] !== '' || store[i - 1][currentClick.x].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(currentClick.y === prevClick.y && currentClick.x > prevClick.x){
          for(let i = prevClick.x + 1; i <= currentClick.x - 1; i++) {        
            if(store[currentClick.y][i] !== '' || store[currentClick.y][i + 1].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else if(currentClick.y === prevClick.y && currentClick.x < prevClick.x){
          for(let i = prevClick.x - 1; i >= currentClick.x + 1; i--) {        
            if(store[currentClick.y][i] !== '' || store[currentClick.y][i - 1].indexOf('m') >= 0){
              move = false;
            }
          }
          if(currentClick.typeFigure.indexOf('m') >= 0){
            move = false;          
          }
        } else {
          move = false;
        }
        if(((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x )
          || ((currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y - 1 && currentClick.x === prevClick.x + 1 ))
          || ((currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x - 1 ) || (currentClick.y === prevClick.y + 1 && currentClick.x === prevClick.x + 1 )))
          && currentClick.typeFigure.indexOf('m') !== prevClick.typeFigure.indexOf('m')) {
          return move = true;
        }
        return move;        
        break;
      }      
    default:
    return false;
  } 
}

export default moveLogic;