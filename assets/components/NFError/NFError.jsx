import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NFError extends Component {
  render() {
    return (
      <section>
        <h2 ref="title">Page not found.</h2>
        <Link to="/">Go to index</Link>
      </section>
    );
  }
}
