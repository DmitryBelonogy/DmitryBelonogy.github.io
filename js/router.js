let routs = [
    {
        name: 'game',
        match: 'game',
        onEnter: () => {
            // let game = new myGame();
            // game.init();
        }
    },
    {
        name: 'record',
        match: 'record',
        onEnter: () => {
            document.getElementsByTagName('body')[0].innerHTML = '';
        }
    }
];

function Router(routs) {

    //обработчик URL
    function handleUrl(url) {

        let curentURL = url;
        if(!curentURL.includes('#')) {
            curentURL += '#game';
            window.location.href += '#game';
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