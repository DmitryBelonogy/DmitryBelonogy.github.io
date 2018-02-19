let dumpLogic = (data, boardState) => {
  let dump = true;
  let click = data.currentClick;
  let dumpingFigure = data.dumpingFigure;
  if(dumpingFigure === 'Pm' || dumpingFigure === 'Lm'){
    click.y === 0 ? dump = false: dump = true;
    if(click.y !== 0){
      boardState[click.y - 1][click.x].indexOf('m') >= 0 ? dump = false: dump = true;
    }    
  }
  if(dumpingFigure === 'Pm'){
    for (let i = 0; i <= 8 ; i++) {
      boardState[i][click.x].indexOf('Pm') >= 0 ? (boardState[i][click.x].indexOf('T') < 0 ? dump = false: null) : null;
    }
  }
  if(dumpingFigure === 'Hm'){
    click.y <= 1 ? dump = false: dump = true;
  }
  return dump;
}

export default dumpLogic;