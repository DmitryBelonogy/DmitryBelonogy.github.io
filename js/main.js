let paused = false;

class myGame {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.img = new Image();  // Создание нового объекта изображения
        this.img.src = 'img/grass.png';
    }

    init() {
        myGame.addMenu();
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.context = this.canvas.getContext('2d');
        this.context.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    }

    static addMenu() {
        document.getElementsByTagName('body')[0].innerHTML = '<div id="menuPanel"><div id="navigation"><ul><li><button id="about">About</button></li><li><button id="bestPlayers">Best palyers</button></li><li><button id="recordGame">Record last game</button></li></ul></div><div id="content"></div></div><div id="menu"><img src="img/settings.png" alt="menu"></div><div id="pause"><img src="img/pause.png" alt="pause"></div>';
    }
}

let game = new myGame();
game.init();

class Component {
    constructor(width, height, x, y, frame, src) {
        this.ctx = game.context;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.dx = (Math.random()*2 - Math.random()*2)*2;
        this.dy = (Math.random()*2 - Math.random()*2)*2;
        this.frames = frame;
        this.image = new Image();
        this.image.src = src;
        this.currentFrame = 0;
        this.currentIndex = 0;
    }

    action() {

        this.x += this.dx;
        this.y += this.dy;
        if (this.x >= game.canvas.width) {
            this.x = 1;
        }
        if (this.y >= game.canvas.height) {
            this.y = 1;
        }
        if (this.x <= 0) {
            this.x = game.canvas.width;
        }
        if (this.y <= 0) {
            this.y = game.canvas.height;
        }
        this.drawImg();
    }

    drawImg() {

        if (this.dx === 0 && this.dy === 0) {
            this.ctx.drawImage(this.image, 0, this.height * this.currentIndex, this.width, this.height, this.x, this.y, this.width, this.height);
            return;
        }

        if (this.dx === 0 && this.dy > 0) {
            this.currentIndex = 0;
        } else if ((this.dx < 0 && this.dy <= 0) || (this.dx < 0 && this.dy > 0)) {
            this.currentIndex = 1;
        } else if (this.dx === 0 && this.dy < 0) {
            this.currentIndex = 2;
        } else if ((this.dx > 0 && this.dy <= 0) || (this.dx > 0 && this.dy > 0)) {
            this.currentIndex = 3;
        }

        this.ctx.drawImage(this.image, this.width * this.currentFrame, this.height * this.currentIndex, this.width, this.height, this.x, this.y, this.width, this.height);

        if (this.currentFrame === this.frames - 1) {
            this.currentFrame = 0;
        } else {
            this.currentFrame++;
        }
    }
}

class Enemy extends Component {

    action() {
        super.action();
        this.collizion();
    }

    collizion() {
        let XColl = false;
        let YColl = false;

        if ((this.x + this.width >= hero.x) && (this.x <= hero.x + hero.width)) XColl = true;
        if ((this.y + this.height >= hero.y) && (this.y <= hero.y + hero.height)) YColl = true;

        if (XColl && YColl) {
            clearInterval(interval);
            alert('Game Over');
        }
    }
}

class SmartEnemy extends Enemy{
    constructor(width, height, x, y, frame, src, radius) {
        super(width, height, x, y, frame, src);
        this.radius = radius;
    }

    create() {
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width/2, this.y + this.height/2, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    action() {
        super.action();
        this.create();
        this.observation();
    }

    observation() {
        let pursuit = false;
        let centerX = this.x + this.width/2;
        let centerY = this.y + this.height/2;
        let pursuitX = -(centerX - (hero.x + hero.width / 2))/20;
        let pursuitY = -(centerY - (hero.y + hero.height / 2))/20;

        if (Math.sqrt(Math.pow(centerX - (hero.x + hero.width / 2), 2) + Math.pow(centerY - (hero.y + hero.height / 2), 2)) <= this.radius) pursuit = true;

        if (pursuit) {
            this.dx = Math.abs(pursuitX) >= 2.8 ?  pursuitX / 2 : pursuitX;
            this.dy = Math.abs(pursuitY) >= 2.8 ?  pursuitY / 2 : pursuitY;
        }
    }

}

class Hero extends Component {
    constructor(width, height, x, y, frame, src) {
        super(width, height, x, y, frame, src);
        this.dx = 0;
        this.dy = 0;
        this.keysdown = {
            68: false,
            65: false,
            87: false,
            83: false
        };
        this.controlKeyDown();
        this.controlKeyUp();
        this.frames = frame;
        this.image = new Image();
        this.image.src = src;
        this.currentFrame = 0;
        this.currentIndex = 0;
    }

    controlKeyDown() {
        window.addEventListener('keydown', (ev) => {
            this.keysdown[ev.keyCode] = true;
            this.changeDirection();
        });
    }

    controlKeyUp() {
        window.addEventListener('keyup', (ev) => {
            this.keysdown[ev.keyCode] = false;
            this.changeDirection();
        });
    }

    changeDirection() {
        if (this.keysdown[65] === true) { //left
            this.dx = -3;
        } else if (this.keysdown[68] === true) { //right
            this.dx = 3;
        } else {
            this.dx = 0;
        }
        if (this.keysdown[87] === true) { //top
            this.dy = -3;
        } else if (this.keysdown[83] === true) { //bot
            this.dy = 3;
        } else {
            this.dy = 0;
        }
    }
}

let hero = new Hero(32, 50, 200, 200, 9, 'img/hero.png' );

let enemy1 = new Enemy(25, 45, Math.random()*(20 - 480) + 480, Math.random()*(20 - 480) + 480, 9, 'img/ghost.png');
let enemy2 = new Enemy(25, 45, Math.random()*(20 - 4800) + 480, Math.random()*(20 - 480) + 480, 9, 'img/ghost.png');
let enemy3 = new Enemy(25, 45, Math.random()*(20 - 480) + 480, Math.random()*(20 - 480) + 480, 9, 'img/ghost.png');

let smartEnemy1 = new SmartEnemy(25, 20, Math.random()*(20 - 480) + 480, Math.random()*(20 - 480) + 480, 9, 'img/bat.png', 100);
let smartEnemy2 = new SmartEnemy(25, 20, Math.random()*(20 - 480) + 480, Math.random()*(20 - 480) + 480, 9, 'img/bat.png', 100);
let smartEnemy3 = new SmartEnemy(25, 20, Math.random()*(20 - 480) + 480, Math.random()*(20 - 480) + 480, 9, 'img/bat.png', 100);

let interval = setInterval(function() {
    if (paused) {
        return false;
    }
    game.clear();
    enemy1.action();
    enemy2.action();
    enemy3.action();
    smartEnemy1.action();
    smartEnemy2.action();
    smartEnemy3.action();
    hero.action();
}, 20);

function pauseAction() {
    let pause = document.getElementById('pause');
    pause.addEventListener('click', ()=> {
        if (paused) {
            paused = false;
        } else if (!paused) {
            paused = true;
        }
    })
}

pauseAction();

function showMenu() {
    let menu = document.getElementById('menu');
    menu.addEventListener('click', ()=> {
        paused = true;
        let menuPanel = document.getElementById('menuPanel');
        if (menuPanel.style.visibility === '') {
            menuPanel.style.visibility = 'visible';
        } else if (menuPanel.style.visibility === 'visible') {
            menuPanel.style.visibility = '';
        }
    })
}

showMenu();

document.getElementById('content').innerHTML = '<p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, dolorem eos eveniet illo ipsam iure perspiciatis placeat quidem soluta vitae. Architecto dicta error fuga ipsa iusto laudantium, neque odit similique?</span><span>Accusantium debitis dicta dolores doloribus esse facere laudantium maxime modi porro quae quasi sint tempore, veritatis! Deserunt distinctio eos quaerat quo? Architecto at deleniti molestiae molestias quaerat quam sint veniam.</span><span>A amet animi cupiditate dolor dolorem ea fuga illum impedit inventore ipsam iste laboriosam molestias neque nesciunt nihil odit officia perferendis quod, ratione recusandae reiciendis repellat, tempora ullam ut, voluptates.</span><span>Aut laborum modi nobis voluptatibus! Ab autem consectetur enim illo, ipsum iure molestias sunt ullam vel voluptatum! Earum, iste numquam optio placeat quam soluta. Eos itaque minus reprehenderit voluptas voluptates.</span><span>Alias consectetur dolores hic mollitia nesciunt qui, veniam vero. Blanditiis ducimus esse explicabo facere harum incidunt, iusto nisi nobis odio optio, pariatur quas qui quisquam reiciendis saepe soluta veniam! Unde.</span><span>Aut laborum modi nobis voluptatibus! Ab autem consectetur enim illo, ipsum iure molestias sunt ullam vel voluptatum! Earum, iste numquam optio placeat quam soluta. Eos itaque minus reprehenderit voluptas voluptates.</span><span>Alias consectetur dolores hic mollitia nesciunt qui, veniam vero. Blanditiis ducimus esse explicabo facere harum incidunt, iusto nisi nobis odio optio, pariatur quas qui quisquam reiciendis saepe soluta veniam! Unde.</span></p>';

function addContent() {
    let navigation = document.getElementById('navigation');
    navigation.addEventListener('click', (ev)=> {
        if (ev.target.tagName !== 'BUTTON') {
            return false;
        } else {
            switch(ev.target.id) {
                case 'about':
                    document.getElementById('content').innerHTML = '';
                    document.getElementById('content').innerHTML = '<p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, dolorem eos eveniet illo ipsam iure perspiciatis placeat quidem soluta vitae. Architecto dicta error fuga ipsa iusto laudantium, neque odit similique?</span><span>Accusantium debitis dicta dolores doloribus esse facere laudantium maxime modi porro quae quasi sint tempore, veritatis! Deserunt distinctio eos quaerat quo? Architecto at deleniti molestiae molestias quaerat quam sint veniam.</span><span>A amet animi cupiditate dolor dolorem ea fuga illum impedit inventore ipsam iste laboriosam molestias neque nesciunt nihil odit officia perferendis quod, ratione recusandae reiciendis repellat, tempora ullam ut, voluptates.</span><span>Aut laborum modi nobis voluptatibus! Ab autem consectetur enim illo, ipsum iure molestias sunt ullam vel voluptatum! Earum, iste numquam optio placeat quam soluta. Eos itaque minus reprehenderit voluptas voluptates.</span><span>Alias consectetur dolores hic mollitia nesciunt qui, veniam vero. Blanditiis ducimus esse explicabo facere harum incidunt, iusto nisi nobis odio optio, pariatur quas qui quisquam reiciendis saepe soluta veniam! Unde.</span><span>Aut laborum modi nobis voluptatibus! Ab autem consectetur enim illo, ipsum iure molestias sunt ullam vel voluptatum! Earum, iste numquam optio placeat quam soluta. Eos itaque minus reprehenderit voluptas voluptates.</span><span>Alias consectetur dolores hic mollitia nesciunt qui, veniam vero. Blanditiis ducimus esse explicabo facere harum incidunt, iusto nisi nobis odio optio, pariatur quas qui quisquam reiciendis saepe soluta veniam! Unde.</span></p>';
                break;
                case 'bestPlayers':
                    document.getElementById('content').innerHTML = '';
                    document.getElementById('content').innerHTML = '<ul id="best10"><li>Player X 100000</li><li>Player X 152022</li><li>Player X 515000</li><li>Player X 51416515</li><li>Player X 15165161</li></ul>';
                    break;
                case 'recordGame':
                    document.getElementById('content').innerHTML = '';
                    document.getElementById('content').innerHTML = 'recordGame';
                    break;
            }
        }
    })
}

addContent();



