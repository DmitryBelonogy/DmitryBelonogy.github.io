let routs = [
  {
    name: 'about',
    match: '',
    onEnter: () => {
                    document.querySelector('#content').innerHTML = '';
                    compileTemplate(tpl_about)(document.querySelector('#content'), data_about);
                  }
  },
  {
    name: 'map',
    match: 'map',
    onEnter: () => {
                    document.querySelector('#content').innerHTML = '';
                    compileTemplate(tpl_map)(document.querySelector('#content'), data_map);
                    getToLocalStorage('history');
                    getToLocalStorage('preference');
                    getCurentPosition();
                   }
  }
];

function Router(routs) {

  let prevURL = window.location.href.split('#').shift();

  //обработчик URL
  function handleUrl(url) {

    let curentURL = url;
    
    if(!prevURL.includes('#') && !curentURL.includes('#')) {
      prevURL += '#';
      curentURL += '#map';
    }

    if (curentURL.split('&').shift() === prevURL.split('&').shift() && curentURL.split('&').shift().includes('map')) {
      return;
    }

    if (curentHref.indexOf('&') !== -1) {
      if (curentHref.search(/&+[0-9]+[.]+[0-9]+[,]+[0-9]+[.]+[0-9]+/) !== -1) {
        console.log(1);
        let coordinate = curentHref.split('&')[1].split(',');
        point[0] = +coordinate[0];
        point[1] = +coordinate[1];
        let curentRout = findRout(curentURL);

        let prevRout = findRout(prevURL);

        curentRout.onEnter();

        prevURL = curentURL;
      } else if (curentHref.search(/&+[a-z]+ | &+[а-я]+/i)) {
        console.log(2);
        let sity = curentHref.split('&').pop();
        let GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';
        console.log(sity);
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + sity + '&key=' + GOOGLE_API_KEY)
          .then((req) => {
            return req.json();
          })
          .then((data) => {
            let location = data.results[0].geometry.location;
            console.log(location);
            point[0] = location.lat;
            point[1] = location.lng;
            let curentRout = findRout(curentURL);

            let prevRout = findRout(prevURL);

            curentRout.onEnter();

            prevURL = curentURL;
          });
      }
    } else {
      let curentRout = findRout(curentURL);

      let prevRout = findRout(prevURL);

      curentRout.onEnter();

      prevURL = curentURL;
    }
 
  }

  function findRout(url) {
    url = url.split('&').shift();
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