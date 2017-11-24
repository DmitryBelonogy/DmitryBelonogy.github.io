let historyArr = [];
let mas = [];
let count = 0;
let timer;
let life = true;
let m = 50;
let n = 50;
let htmlType = '<canvas id="canvas" width="300" height="300"></canvas>';
let id = 'canvas';

let routs = [
    {
        name: 'canvas',
        match: 'canvas',
        onEnter: () => {
            document.getElementById('content').innerHTML = '';
            htmlType = '<canvas id="canvas" width="300" height="300"></canvas>';
            id = 'canvas';
            game = new Game(htmlType, id);
            game.drawGameField();
            drawField();
            document.getElementById(game.id).addEventListener('click', (event) => {
                console.log('click');
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
        }
    },
    {
        name: 'svg',
        match: 'svg',
        onEnter: () => {
            document.getElementById('content').innerHTML = '';
            htmlType = '<svg id="svg" width="300" height="300"></svg>';
            id = 'svg';
            game = new Game(htmlType, id);
            game.drawGameField();
            drawField();
            document.getElementById(game.id).addEventListener('click', (event) => {
                console.log('click');
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
        }
    },
    {
        name: 'div',
        match: 'div',
        onEnter: () => {
            document.getElementById('content').innerHTML = '';
            htmlType = '<div id="div"></div>';
            id = 'div';
            game = new Game(htmlType, id);
            game.drawGameField();
            drawField();
            document.getElementById(game.id).addEventListener('click', (event) => {
                console.log('click');
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
        }
    },
    {
        name: 'text',
        match: 'text',
        onEnter: () => {
            document.getElementById('content').innerHTML = '';
            htmlType = '<pre id="pre"></pre>';
            id = 'pre';
            game = new Game(htmlType, id);
            game.drawGameField();
            drawField();
            document.getElementById(game.id).addEventListener('click', (event) => {
                let x = event.offsetX;
                let y = event.offsetY;
                let preWidth = event.target.clientWidth;
                let preHeight = event.target.clientHeight;
                let cellWidth = preWidth / mas[0].length;
                let cellHeight = preHeight / mas.length;
                x = Math.floor(x/cellWidth);
                y = Math.floor(y/cellHeight);
                if (mas[y][x] === 1) {
                    mas[y][x] = 0;
                } else if (mas[y][x] === 0) {
                    mas[y][x] = 1;
                }
                drawField();
            });
        }
    },
];

class Game {
    constructor(htmlType, id) {
        this.html = htmlType;
        this.id = id;
    }

    drawGameField() {
        if (this.html.indexOf('canvas') !== -1) {
            document.getElementById('content').innerHTML = this.html;
            this.fieldType = document.getElementById('canvas');
            this.ctx = canvas.getContext('2d');
        } else if (this.html.indexOf('svg') !== -1) {
            document.getElementById('content').innerHTML = this.html;
            this.fieldType = document.getElementById('svg');
        } else if (this.html.indexOf('div') !== -1) {
            document.getElementById('content').innerHTML = this.html;
            this.fieldType = document.getElementById('div');
        } else if (this.html.indexOf('pre') !== -1) {
            document.getElementById('content').innerHTML = this.html;
            this.fieldType = document.getElementById('pre');
        }
    }
}

function Router(routs) {

    //обработчик URL
    function handleUrl(url) {

        let curentURL = url;
        if(!curentURL.includes('#')) {
            curentURL += '#canvas';
            window.location.href += '#canvas';
        }

        curentRout = findRout(curentURL);

        curentRout.onEnter();

    }

    function findRout(url) {
        url = url.split('#').pop();
        return routs.find((rout) => {
            if (typeof rout.match === 'string') {
                return rout.match === url;
            }
            if (rout.match instanceof RegExp) {
                return rout.match.test(url);
            }
            if (typeof rout.match === 'function') {
                return rout.match(url);
            }
        });
    }

    // Подписаться на изменения URL
    window.addEventListener('hashchange', (ev) => handleUrl(ev.newURL));

    // При загрузке страницы - считать состояние и запустить обработчик
    handleUrl(window.location.href);

    // Переопределить поведение внутренних ссылок
    document.body.addEventListener('click', (ev) => {
        if(!ev.target.matches('a')) {
            return;
        }
        ev.preventDefault();
        // При клике по ссылке - обновлять URL
        url = ev.target.getAttribute('href');
        window.location.hash = url;
    });
}

Router(routs);

if (game.html.indexOf('div') !== -1) {
    game.fieldType.style.width = m * 10 + 'px';
    game.fieldType.style.height = n * 10 + 'px';
}

function toLife() {

    for (let i = 0; i < m; i++) {
        mas[i] = [];
        for (let j = 0; j < n; j++) {
            mas[i][j] = 0;
        }
    }

    if (game.html.indexOf('pre') !== -1) {
        drawField();
    }
}

toLife();

function drawField() {
    changeSize();

    if (game.html.indexOf('canvas') !== -1) {
        game.ctx.clearRect(0, 0, m * 100, n * 100);
    } else if (game.html.indexOf('svg') !== -1 || game.html.indexOf('div') !== -1 || game.html.indexOf('pre') !== -1) {
        game.fieldType.innerHTML = '';
    }

    if (game.html.indexOf('pre') !== -1) {
        let text = '';
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (!mas[i]) {
                    mas[i] = [0, 0];
                }
                if (mas[i][j] === 1) {
                    text += 'X';
                } else {
                    text += ' ';
                }
            }
            text += '\n'
        }
        pre.innerText = text;
    } else {
        for (let i = 0; i < m; i++) {
            if (!mas[i]) {
                mas[i] = [0, 0];
            }
            for (let j = 0; j < n; j++) {
                if (mas[i][j] === 1) {
                    if (game.html.indexOf('canvas') !== -1) {
                        game.ctx.fillRect(i*10, j*10, 10, 10);
                    } else if (game.html.indexOf('svg') !== -1) {
                        game.fieldType.innerHTML += `<rect x="${i * 10}" y="${j * 10}" width="10" height="10" fill="black"></rect>`;
                    } else if (game.html.indexOf('div') !== -1) {
                        game.fieldType.innerHTML += `<i style="top: ${j * 10}px; left: ${i * 10}px"></i>`;
                    }

                }
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

    if (game.html.indexOf('canvas') !== -1 || game.html.indexOf('svg') !== -1) {
        game.fieldType.setAttribute('width', m + '0');
        game.fieldType.setAttribute('height', n + '0');
    } else if (game.html.indexOf('div') !== -1) {
        game.fieldType.style.width = m * 10 + 'px';
        game.fieldType.style.height = n * 10 + 'px';
    }

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

