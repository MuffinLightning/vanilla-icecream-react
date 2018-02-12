import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { findDOMNode } from 'react-dom';
import Location from 'services/location';
import moment from 'moment';
import _ from 'lodash';

import Forecast from 'components/Forecast/Forecast';
import Graph from 'components/Graph/Graph';
import Loader from 'components/Loader/Loader';
import classNames from 'classnames';


import {
  getLocality,
  mapWeatherToWeek,
  convert,
  selectWeather
} from 'services/utils';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      position: {},
      location: {},
      weather: {},
      temp: (() => {
        return localStorage.getItem('tempPreference') || 'c';
      })()
    };
  }

  componentWillMount() {
    Location.init().then(response => {
      this.setState({
        loading: false,
        ...response
      });
    });
  }

  setTemperature(temp) {
    this.setState({
      temp
    }, () => {
      localStorage.setItem('tempPreference', temp);
    });
  }

  render() {
    const { loading, temp } = this.state;

    let location;
    let week = [];

    if (!loading) {
      location = getLocality(this.state.location.address_components);
      week = mapWeatherToWeek(this.state.weather.daily.data);

      console.log(this.state.weather);
    }

    return (
      <div>
        {this.state.loading ? <Loader loading /> :
          <div>
            <div class={classNames('app', selectWeather(this.state.weather.currently.icon))}>

              <div class="temp-toggle">
                <span onClick={() => this.setTemperature('c')} class={classNames({active: temp === 'c'})}>C</span>
                <em>/</em>
                <span onClick={() => this.setTemperature('f')} class={classNames({active: temp === 'f'})}>F</span>
              </div>

              <div class="summary">
                {this.state.weather.currently.summary}
              </div>

              <div class="temperature">
                {convert(this.state.weather.currently.temperature, temp)}<span>°</span>
              </div>

              <div class="location">{location}</div>

              <p>{this.state.weather.daily.summary}</p>

              <div class="time">Today, {moment().format('h:mm a')}</div>

              <Forecast ref="forecast" temp={temp} week={week} />

              <Graph temp={temp} data={this.state.weather.hourly.data} />
            </div>
          </div>
        }
      </div>
    );
  }
}
