import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

export class ThemeProvider extends Component {
  getChildContext() {
    const { theme } = this.props;
    return { theme };
  }

  render() {
    return Children.only(this.props.children);
  }
}

ThemeProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

ThemeProvider.childContextTypes = {
  theme: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
