let myMap;

let center;

let curentHref = window.location.href;

function init () {
  // Создание экземпляра карты и его привязка к контейнеру с
  // заданным id ("map").
  myMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: [53.54, 27.34], // Минск
      zoom: 8,
      controls: ['zoomControl', 'typeSelector']
  });

  myMap.setCenter(point, 11, {
    duration: 1500
  });

  function changeURL() {
    if(!curentHref.includes('#map') ) {
      curentHref += '#map';
    }
    if (curentHref.includes('&')) {
      curentHref = curentHref.split('&').shift();
      let text = '&' + center.join(',');
      let modifyHref = curentHref + text;
      window.location.href = modifyHref;
    } else {
      let text = '&' + center.join(',');
      let modifyHref = curentHref + text;
      window.location.href = modifyHref;
    }
    
  }

  let showCenter = () => {
    center = myMap.getCenter();
    point = center;
    getForecastByLatLng(center);    
    changeURL();
    return center;
  };

  myMap.events.add('actionend', showCenter);
  
  showCenter();
 
}


