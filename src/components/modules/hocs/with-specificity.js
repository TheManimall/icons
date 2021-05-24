import React, { Component } from 'react';
import { withParentClass } from '../utils';
import path from 'path';
import { selectStyles } from '../form/select';

// export const withSpecificity = (ComposedComponent, inputType, specificClass) =>
//   class extends Component {
//     render() {
//       const stylePath = `../${path.join('form', inputType, 'styles')}`;

//       const styles = require(`${stylePath}`);

//       const newStyles = withParentClass(specificClass, {
//         styles
//       });
//       const mergedProps = { ...this.props, styles: newStyles };

//       return <ComposedComponent {...mergedProps} />;
//     }
//   };
