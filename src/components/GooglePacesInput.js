import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = (params) => {

  return (
    <GooglePlacesAutocomplete
      placeholder='Search Location'
      minLength={4}
      onPress={(data, details = null) => {
        params.onChange(data);
      }}
      query={{
        key: 'AIzaSyDG4EyiR2isqQEf-BaPVF9w-OtPUwZdtbM',
        language: 'en',
      }}
      styles={(params.props.styles == null)? "": params.props.styles}
    />
  );
};

export default GooglePlacesInput;