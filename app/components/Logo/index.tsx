import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Images} from '@config';


 const Logo =props=> {
  const {
    logoHeight,
    logoWidth,
  } = props;

  return (
      <Image style={[{height:logoHeight,width:logoWidth}]} source={Images.logo}/>        

     );
}

Logo.propTypes = {
    logoHeight: PropTypes.number,
    logoWidth: PropTypes.number, 
};

Logo.defaultProps = {
    logoHeight: 150,
    logoWidth: 150
};

export default Logo
