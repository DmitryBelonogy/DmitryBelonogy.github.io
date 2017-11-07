let myMap;

let center;

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

  var showCenter = () => {
    center = myMap.getCenter();
    getForecastByLatLng(center);
    return center;
  };

  myMap.events.add('actionend', showCenter);
  
  showCenter();
 
}


