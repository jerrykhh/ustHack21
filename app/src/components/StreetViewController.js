import React from 'react';
import { View, StyleSheet } from 'react-native';
import StreetView from 'react-native-streetview';

const StreetViewController = (props) => {

    console.log(props);
    return (
        <View style={styles.container}>
            <StreetView
                style={styles.streetView}
                allGesturesEnabled={true}
                coordinate={{
                    'latitude': props.lat,
                    'longitude': props.lng
                }}
                pov={{
                    tilt: parseFloat(0),
                    bearing: parseFloat(0),
                    zoom: parseInt(1)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    streetView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  export default StreetViewController;