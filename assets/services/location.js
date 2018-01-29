import 'whatwg-fetch';
import forecast from 'services/forecast';

export default {

  init() {

    return new Promise(resolve => {
      this.getPosition().then(position => {
        this.getLocationAndWeather(
          position.coords.latitude,
          position.coords.longitude
        ).then(res => {
          res.position = position;
          return resolve(res);
        });
      });
    });
    
  },

  getCachedPosition() {
    const cachedPosition = this.getStoredPosition();

    return this.getLocationAndWeather(
      cachedPosition.coords.latitude,
      cachedPosition.coords.longitude
    ).then(res => {
      return new Promise(resolve => {
        res.position = cachedPosition;
        resolve(res);
      });
    });
  },

  getLocationAndWeather(lat, lng) {
    return Promise.all([
      this.getLocation(lat, lng),
      this.getWeather(lat, lng),
    ]).then(responses => new Promise(resolve =>
      resolve({
        location: responses[0].results[0],
        weather: responses[1],
      })
    ));
  },

  getPosition() {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(position => {

        let { latitude, longitude } = position.coords;

        this.updatePosition(position, resolve);

      }, err => {

        console.error(err);
        return reject(err);
      });
    });
  },

  getStoredPosition() {
    return JSON.parse(localStorage.getItem('position'));
  },

  getLocation(latitude, longitude) {
    // Google Maps Geodecoder
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`;

    return fetch(url).then(res => res.json());
  },

  getWeather(latitude, longitude) {
    return new Promise((resolve, reject) => {
      forecast.getForecast(latitude, longitude).then(res => {
        resolve(res);
      });
    });
  },

  ////////////////////////////
  //    UPDATE METHODS     //
  //////////////////////////

  updatePosition(position, callback) {
    localStorage.setItem('position', JSON.stringify({
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      timestamp: position.timestamp,
    }));

    if (callback) callback(position);
  },
};
