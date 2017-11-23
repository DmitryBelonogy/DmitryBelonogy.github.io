let svg = document.getElementById('svg');
let historyArr = [];
let mas = [];
let count = 0;
let timer;
let life = true;
let m = 50,
    n = 50;

svg.addEventListener('click', (event) => {
    let x = event.offsetX;
    let y = event.offsetY;
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    if (mas[x][y] === 1) {
        mas[x][y] = 0;
    } else if (mas[x][y] === 0) {
        mas[x][y] = 1;
    }
    drawField();
});

function toLife() {

    for (let i = 0; i < m; i++) {
        mas[i] = [];
        for (let j = 0; j < n; j++) {
            mas[i][j] = 0;
        }
    }
}

toLife();

function drawField() {
    changeSize();
    svg.innerHTML = '';
    for (let i = 0; i < m; i++) {
        if (!mas[i]) {
            mas[i] = [0, 0];
        }
        for (let j = 0; j < n; j++) {
            if (mas[i][j] === 1) {
                svg.innerHTML += `<rect x="${i * 10}" y="${j * 10}" width="10" height="10" fill="black"></rect>`;
            }
        }
    }
}

function startLife(){
    historyArr.push(mas);
    let speed = document.getElementById('speed').value;
    if (!life) {
        return false;
    }
    //моделирование жизни
    let mas2 = [];
    for (let i = 0; i < m; i++){
        mas2[i]=[];
        for (let j = 0; j < n; j++){
            let neighbors = 0;
            if (mas[i][fpp(j)-1] === 1) neighbors++;//up
            if (mas[fpmP(i)][j] ===1) neighbors++;//right
            if (mas[i][fpp(j)+1] === 1) neighbors++;//bottom
            if (mas[fpmM(i)][j] === 1) neighbors++;//left
            if (mas[fpmM(i)][fpp(j)-1] === 1) neighbors++;
            if (mas[fpmP(i)][fpp(j)-1] === 1) neighbors++;
            if (mas[fpmM(i)][fpp(j)+1] === 1) neighbors++;
            if (mas[fpmP(i)][fpp(j)+1] === 1) neighbors++;
            if (neighbors === 3) {
                mas2[i][j]=1;
            } else if (neighbors === 2) {
                mas2[i][j] = mas[i][j];
            } else {
                mas2[i][j] = 0;
            }
        }
    }
    mas = mas2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = count;
    timer = setTimeout(startLife, 1600 - 15 * speed);
}

function fpmP(i){
    if(i === m - 1) return 0;
    else return i+1;
}

function fpmM(i) {
    if(i === 0) return m - 1;
    else return i-1;
}

function fpp(i){
    if(i === 0) return n;
    else return i;
}

function stopLife() {
    life = false;
    document.getElementById('btnEnd').disabled = true;
    document.getElementById('btnStart').disabled = false;
    document.getElementById('widthSize').disabled = false;
    document.getElementById('heightSize').disabled = false;
    document.getElementById('prevHistory').disabled = false;
}

document.getElementById('btnEnd').disabled = true;
document.getElementById('prevHistory').disabled = true;
document.getElementById('nexHistory').disabled = true;

document.getElementById('btnStart').addEventListener('click', () => {
    life = true;
    drawField();
    document.getElementById('btnEnd').disabled = false;
    document.getElementById('btnStart').disabled = true;
    document.getElementById('widthSize').disabled = true;
    document.getElementById('heightSize').disabled = true;
    document.getElementById('prevHistory').disabled = true;
    document.getElementById('nexHistory').disabled = true;
});

document.getElementById('btnStart').onclick = startLife;
document.getElementById('btnEnd').onclick = stopLife;

function changeSize() {
    let widthSize = document.getElementById('widthSize').value;
    let heightSize = document.getElementById('heightSize').value;

    m = +widthSize;
    n = +heightSize;

    svg.setAttribute('width', m + '0');
    svg.setAttribute('height', n + '0');
}

function backHistory() {
    mas = [];
    mas = historyArr[count - 1];
    if (count === 1) {
        document.getElementById('prevHistory').disabled = true;
    }
    count--;
}

document.getElementById('prevHistory').addEventListener('click', () => {
    backHistory();
    document.getElementById('count').innerHTML = count;
    drawField();
    document.getElementById('nexHistory').disabled = false;
});

function nextHistory() {
    count++;
    if (count >= historyArr.length - 1) {
        document.getElementById('nexHistory').disabled = true;
    }
    mas = [];
    mas = historyArr[count];
}

document.getElementById('nexHistory').addEventListener('click', () => {
    nextHistory();
    document.getElementById('count').innerHTML = count;
    drawField();
    document.getElementById('prevHistory').disabled = false;
});