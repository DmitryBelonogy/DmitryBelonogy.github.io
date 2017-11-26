class myGame {
    constructor() {
        this.canvas = document.createElement('canvas')
    }

    init() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

let game = new myGame();
game.init();

class Component {
    constructor(width, height, color, x, y) {
        this.ctx = game.context;
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.dx = (Math.random() - Math.random()) * 3;
        this.dy = (Math.random() - Math.random()) * 3;
        this.create();
    }

    create() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
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
        this.create();
    }
}

class Hero extends Component {
    constructor(width, height, color, x, y) {
        super(width, height, color, x, y);
        this.dx = 0;
        this.dy = 0;
        this.keysdown = {
            68: 0,
            65: 0,
            87: 0,
            83: 0
        };
        this.controlKey();
    }

    controlKey() {
        window.addEventListener('keydown', (ev) => {
            ev.preventDefault();
            this.keysdown[ev.keyCode] = 1;
            console.log(this.keysdown);
            this.changeDirection();
        });

        window.addEventListener('keyup', (ev) => {
            ev.preventDefault();
            this.keysdown[ev.keyCode] = 0;
            this.changeDirection();
        });

    }

    changeDirection() {
        this.keysdown[68] === 1 ? this.dx = 3 : this.dx = 0 ;//right
        this.keysdown[65] === 1 ? this.dx = -3 : this.dx = 0;//left
        if (this.keysdown[65] === 1 && this.keysdown[68] === 1) {
            this.dx = 0;
        }
        this.keysdown[87] === 1 ? this.dy = -3 : this.dy = 0;//top
        this.keysdown[83] === 1 ? this.dy = 3 : this.dy = 0;//bot
        if (this.keysdown[87] === 1 && this.keysdown[83] === 1) {
            this.dy = 0;
        }
    }
}

let hero = new Hero(30, 40, 'blue', 200, 200);

let component1 = new Component(30, 40, 'red', Math.random()*(20 - 480) + 480, Math.random()*(20 - 480) + 480);
let component2 = new Component(30, 40, 'red', Math.random()*(20 - 4800) + 480, Math.random()*(20 - 480) + 480);
let component3 = new Component(30, 40, 'red', Math.random()*(20 - 480) + 480, Math.random()*(20 - 480) + 480);


var interval = setInterval(function() {
    game.clear();
    component1.action();
    component2.action();
    component3.action();
    hero.action();
}, 20);