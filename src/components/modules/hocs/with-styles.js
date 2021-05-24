import React, { Component } from 'react';

export const withStyles = outerProps => ComposedComponent =>
  class extends Component {
    static displayName = ComposedComponent.displayName ||
      ComposedComponent.name ||
      'Component';

    composedProps = () => {
      if (!outerProps.innerStyles) {
        return { ...this.props, styles: {} };
      }
    };

    render() {
      const newProps = this.composedProps();
      return <ComposedComponent {...newProps} />;
    }
  };
