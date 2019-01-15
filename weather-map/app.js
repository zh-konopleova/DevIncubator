const WEATHER_API_KEY = '08cfcbb48598e2c1c8f25175cff6e48c';

ymaps.ready(init);
function init(){
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    myMap.events.add('click', function (e) {
        let coords = e.get('coords');
        requestWeatherAPI(coords[0], coords[1]);

        myMap.balloon.open(coords, {
          contentHeader: 'Ляля',
          contentBody: 'В студеную зимнюю пору' +
          ' <span style="color:red; font-weight:bold">Я</span>' +
          ' из лесу <b>вышел</b>',
        });
    });

}

function requestWeatherAPI(lat, lon) {
  let xhr = new XMLHttpRequest();
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}`;

  xhr.open('GET', url, false);
  xhr.send();

  if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
  } else {
    alert( xhr.responseText ); // responseText -- текст ответа.
  }
}
