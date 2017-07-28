import React from 'react';
import PropTypes from 'prop-types';


function FormattedTime({value = 0, unit}) {
  // HTMLAudioElement provides time in seconds
  // SoundCloud provides time in milliseconds
  if (unit === 'ms') {
    value /= 1000; // convert milliseconds to seconds
  }

  let hours = Math.floor(value / 3600);
  let minutes = `0${Math.floor((value % 3600) / 60)}`.slice(-2);
  let seconds = `0${Math.floor((value % 60))}`.slice(-2);
  let formattedTime;

  if (hours) {
    formattedTime = `${hours}:${minutes}:${seconds}`;
  }
  else {
    formattedTime = `${minutes}:${seconds}`;
  }

  return <span>{formattedTime}</span>;
}

FormattedTime.propTypes = {
  unit: PropTypes.string,
  value: PropTypes.number
};

export default FormattedTime;
