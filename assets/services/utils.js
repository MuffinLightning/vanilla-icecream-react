import moment from 'moment';

export function convert(val, temp) {
  temp = temp.toLowerCase();

  if (temp === 'c') return Math.round(val);
  else return Math.round(String((val * (9/5)) + 32));
}

export function convertDisplay(val) { //value only
  return Math.round(String((val * (9/5)) + 32));
}

export function getLocality(addresses) {
  let locality = _.find(addresses, item => item.types.indexOf('locality') > -1);

  return locality.long_name;
}

export function mapWeatherToWeek(weather) {
  let hours = 24;
  let days = [];
  let day;

  for (let i = 0; i < weather.length; i++) {
    day = weather[i];
    day.time = moment().add(hours, 'hours');
    days.push(day);
    hours += 24;
  }

  return days;
}

export function selectWeather(icon = '') {
  icon = icon.toLowerCase();

  switch (true) {
    case /rain/.test(icon):
      return 'raining';
    case /snow/.test(icon):
      return 'snowing';
    case /sleet/.test(icon):
      return 'snowing';
    case /fog/.test(icon):
      return 'foggy';
    case /wind/.test(icon):
      return 'windy';
    case /cloudy/.test(icon):
      return 'partly-cloudy';
    case /clear\-day/.test(icon):
      return 'clear-day';
    case /clear\-night/.test(icon):
      return 'clear-night';
  }
}

export function selectIcon(icon = '') {
  icon = icon.toLowerCase();

  switch (true) {
    case /rain/.test(icon):
      return 'icon-raindrops2';
    case /snow/.test(icon):
      return 'icon-cloud-snow2';
    case /partly\-cloudy/.test(icon):
      return 'icon-cloud-sun2';
    case /sleet/.test(icon):
      return 'icon-snow';
    case /fog/.test(icon):
      return 'icon-cloud-fog2';
    case /wind/.test(icon):
      return 'icon-wind';
    case /^cloudy$/.test(icon):
      return 'icon-clouds2';
    case /clear\-day/.test(icon):
      return 'icon-sun2';
    case /clear\-night/.test(icon):
      return 'icon-stars2';
  }
}
