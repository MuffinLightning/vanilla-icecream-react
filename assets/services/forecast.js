import { ajax } from 'jquery';

const API_KEY = '0257d902bce70bfc8d0d023ca9560ed8';

export default {

  getForecast(latitude, longitude) {
    let url = `https://api.forecast.io/forecast/${API_KEY}/${latitude},${longitude}?units=si`;

    return ajax({
      url: url,
      dataType: 'jsonp'
    });
  }

}
