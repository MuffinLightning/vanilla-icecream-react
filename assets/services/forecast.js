import { ajax } from 'jquery';

const API_KEY = 'YOUR_KEY';

export default {

  getForecast(latitude, longitude) {
    let url = `https://api.forecast.io/forecast/${API_KEY}/${latitude},${longitude}?units=si`;

    return ajax({
      url: url,
      dataType: 'jsonp'
    });
  }

}
