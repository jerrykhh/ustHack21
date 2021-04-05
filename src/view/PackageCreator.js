import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import GooglePlacesAutocomplete from '../components/GooglePacesInput';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    searchContainer: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 50,
        width: Dimensions.get('window').width - 30,
    }
});

const PackageCreator = (props) => {
    console.log(props.id);
    return (
        <View style={styles.container} >
            <MapView style={styles.map} />
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete props={{styles: null}} />
            </View>
        </View >
    )

}

export default PackageCreator;