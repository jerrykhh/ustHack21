import React, {useState} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = (params) => {

  const [queryString, setQueryString]  = useState({
    key: 'AIzaSyDG4EyiR2isqQEf-BaPVF9w-OtPUwZdtbM',
    language: 'en'
  });

  return (
    <GooglePlacesAutocomplete
      placeholder='Search Location'
      fetchDetails={true}
      minLength={4}
      listViewDisplayed={false}
      keyboardShouldPersistTaps='always'
      onPress={(data, details = null) => {
        console.log("click");
        console.log(data, details);
        params.onChange({address: data, geometry: details.geometry});
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