import React from 'react';
import PropTypes from 'prop-types';

const imgWithClick = { cursor: 'pointer' };

const Photo = ({ photo, margin, direction, top, left, key }) => {
  const imgStyle = { margin: margin, display: 'block',position:'absolute',left,top};
  
  return (
    <img
      key={key}
      style={imgStyle}
      {...photo}
    />
  );
};

export const photoPropType = PropTypes.shape({
  key: PropTypes.number,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string,
  srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sizes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
});

Photo.propTypes = {
  index: PropTypes.number.isRequired,
  photo: photoPropType.isRequired,
  margin: PropTypes.number,
  top: props => {
    if (props.direction === 'column' && typeof props.top !== 'number') {
      return new Error('top is a required number when direction is set to `column`');
    }
  },
  left: props => {
    if (props.direction === 'column' && typeof props.left !== 'number') {
      return new Error('left is a required number when direction is set to `column`');
    }
  },
  direction: PropTypes.string,
};

export default Photo;
