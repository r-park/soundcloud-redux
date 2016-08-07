import React from 'react';


const REPLACER_PATTERN = /(.)(?=(\d{3})+$)/g;


function FormattedInteger({value}) {
  if (value >= 1000) value = String(value).replace(REPLACER_PATTERN, '$1,');
  return <span>{value}</span>;
}

FormattedInteger.propTypes = {
  value: React.PropTypes.number.isRequired
};

export default FormattedInteger;
