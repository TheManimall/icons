import React from 'react';
import PropTypes from 'prop-types';
import { classes } from 'typestyle';
import { tileStyles, tileColor } from './styles';

const Tile = ({ extraClasses, color, children }) => {
  return (
    <div className={classes(tileColor(color), tileStyles, extraClasses)}>
      {children}
    </div>
  );
};

Tile.propTypes = {
  color:        PropTypes.string,
  extraClasses: PropTypes.string,
  children:     PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default Tile;
