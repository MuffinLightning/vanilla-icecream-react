import React, { Component } from 'react';
import { convert, convertDisplay } from 'services/utils';
import moment from 'moment';

export default class Graph extends Component {
  constructor(props) {
    super(props);
  }

  normalize(data) {
    let temperatures = data.map(hour => convertDisplay(hour.temperature));

    let r = Math.max.apply(Math, temperatures) / 100;

    for (let i = 0; i < temperatures.length; i++) {
      data[i].percent = Math.round(temperatures[i] / r);
    }
  }

  render() {

    this.normalize(this.props.data);

    return (
      <div class="Graph">
        <ul class="bars">
          {this.props.data.map((hour, i) =>
            <li key={hour.time} class="bar-item">
              <div class="bar" style={{ height: `${hour.percent}%` }}>
                <span class="time">{moment().add(i + 1, 'hours').format('ha')}</span>
                <span class="temp">
                  {convert(hour.temperature, this.props.temp)}<span class="deg">°</span>
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
