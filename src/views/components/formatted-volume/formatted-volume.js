import React from 'react';
import PropTypes from 'prop-types';


function FormattedVolume({value = 0}) {
  if (!value) {
    value = '0.0';
  }
  else {
    value /= 10;
    let precision = value >= 1 ? 2 : 1;
    value = value.toPrecision(precision);
  }

  return <span>{value}</span>;
}

FormattedVolume.propTypes = {
  value: PropTypes.number
};

export default FormattedVolume;
