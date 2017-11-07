let routs = [
  {
    name: 'about',
    match: '',
    onEnter: () => compileTemplate(tpl_about)(document.querySelector('#content'), data_about)
  },
  {
    name: 'map',
    match: 'map',
    onEnter: () => {
                    compileTemplate(tpl_map)(document.querySelector('#content'), data_map);
                    getToLocalStorage('history');
                    getToLocalStorage('preference');
                    getCurentPosition();
                   }
  }
];

function Router(routs) {

  let prevURL = window.location.href;

  //обработчик URL
  function handleUrl(url) {
   
    let curentURL = url;
    if(!prevURL.includes('#') && !curentURL.includes('#')) {
      prevURL += '#';
      curentURL += '#';
    }
    
    curentRout = findRout(curentURL);
    prevRout = findRout(prevURL);

    curentRout.onEnter();

    prevURL = curentURL;
    
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
    let url = ev.target.getAttribute('href');
    window.location.hash = url;
  });
}

Router(routs);