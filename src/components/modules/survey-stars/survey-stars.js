import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const defaultStyles = {
  float:    'left',
  cursor:   'pointer',
  overflow: 'hidden',
  position: 'relative',
  display:  'block',
}

const parentStyles = {
  overflow: 'hidden',
  position: 'relative'
}

const selectedAlert = {
  clip:       'rect(1px 1px 1px 1px)', /* IE6, IE7 */
  clip:       'rect(1px, 1px, 1px, 1px)',
  height:     '1px',
  overflow:   'hidden',
  position:   'absolute !important',
  whiteSpace: 'nowrap',
  width:      '1px'
}

const SurveyStars = ({ char, className, count, onChange, selectedColor, size, unselectedColor }) => {
  const getStars = activeCount => {
    const buildingStars = [];

    for (let i = 0; i < count; i += 1) {
      buildingStars.push({
        active: i <= activeCount - 1
      });
    }

    return buildingStars;
  };

  const [value, setValue] = useState(0);
  const [stars, setStars] = useState(getStars(value));

  const getSelectedRatingIndex = () => Number(event.target.getAttribute('data-index'));

  const mouseLeave = () => setStars(getStars(value));

  const mouseOver = () => setStars(getStars(getSelectedRatingIndex() + 1));

  const selectRating = () => {
    const selectedIndex = getSelectedRatingIndex();
    const dataValue = selectedIndex + 1;

    setValue(dataValue);
    setStars(getStars(dataValue));
    onChange(dataValue);
  };

  const handleKeyDown = () => {
     /*
      * If user pressed ENTER key, select rating,
      * otherwise remove focus of rating.
      */
    if (event.keyCode === 13) {
      selectRating();
    } else {
      mouseLeave();
    }
  };

  const renderStars = () => stars.map((star, index) => {
    const style = Object.assign({}, defaultStyles, {
      color:    star.active ? selectedColor : unselectedColor,
      fontSize: `${size}px`
    });

    const showAlert = index + 1 == value;

    const alertProps = {
      'aria-hidden': !showAlert,
      'role': showAlert ? 'alert' : ''
    };

    return (
      <Fragment key={index}>
        <button
          aria-label={`Select ${index + 1} out of ${count}`}
          data-index={index}
          onClick={selectRating}
          onKeyDown={handleKeyDown}
          onMouseLeave={mouseLeave}
          onMouseMove={mouseOver}
          onMouseOver={mouseOver}
          style={style}
          tabIndex="0"
        >
          {char}
        </button>
        <div id={`selected-rating-${index + 1}`} style={selectedAlert} {...alertProps}>
          You have selected a rating of {index + 1} out of {count}
        </div>
      </Fragment>
    );
  });

  return (
    <div className={className} style={parentStyles}>
      {renderStars()}
    </div>
  );
};

SurveyStars.propTypes = {
  char:            PropTypes.string,
  count:           PropTypes.number,
  onChange:        PropTypes.func,
  selectedColor:   PropTypes.string,
  size:            PropTypes.number,
  unselectedColor: PropTypes.string,
};

SurveyStars.defaultProps = {
  char:            '★',
  count:           5,
  onChange:        () => {},
  selectedColor:   '#ffd700',
  size:            15,
  unselectedColor: 'gray'
};

export default SurveyStars;
