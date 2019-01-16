const WEATHER_API_KEY = '08cfcbb48598e2c1c8f25175cff6e48c';

ymaps.ready(init);

function init(){
    let myMap = new ymaps.Map("map", {
        center: [53.9, 27.57],
        zoom: 10
    });

    myMap.events.add('click', function (e) {
        let coords = e.get('coords');
        let response = requestWeatherAPI(coords[0], coords[1]);
        let converter = {
          'Clouds': 'cloudy',
          'Snow': 'snowy',
          'Rain': 'rainy',
          'Sun': 'sunny',
          'Clear': 'sunny'
        };
        icon = converter[response.weather[0].main] || 'another';

        myMap.balloon.open(coords, {
          contentHeader: response.name,
          contentBody: getBaloonContentBody(response.main.temp, icon)
        });
    });
};

function getBaloonContentBody(temp, icon) {
  return  `
    <div style="margin: 10px; display: flex; flex-direction: row; justify-content: space-between; align-items: center">
        <img src="img/${icon}.svg" width="40px" height="40px">
        <span style="padding-left: 5px; font-size: 20px; color: red">${temp}&#8451;</span>
    </div>
  `
};

function requestWeatherAPI(lat, lon) {
  let xhr = new XMLHttpRequest();
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric&lang=ru`;

  xhr.open('GET', url, false);
  xhr.send();

  if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText );
  } else {
    return JSON.parse(xhr.responseText);
  }
}
