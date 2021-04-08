import React, {Component, useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import RegionForCoordinates from '../components/getRegionForCoordinates';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const Home = () => {

    /*const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            setLocation(location.coords);
        })();
    });*/



    return (
        <View style={styles.container}>
            
        </View>
    )
}

export default Home;