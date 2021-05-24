import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const withTheme = ComponentToWrap =>
  class ThemeComponent extends Component {
    static contextTypes = {
      theme: PropTypes.object
    };
    render() {
      const { theme } = this.context;
      return <ComponentToWrap {...this.props} theme={theme} />;
    }
  };
