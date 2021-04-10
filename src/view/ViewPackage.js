import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from 'reanimated-bottom-sheet';

const window = Dimensions.get('window');

const getRadomColor = () => {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
}

const calRegion = (geometry) => {

    console.log(geometry, "as")

    const northeast = geometry.viewport.northeast;
    const southwest = geometry.viewport.southwest;
    const updateLatDelta = northeast.lat - southwest.lat;

    return {
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
        latitudeDelta: updateLatDelta* 3.5,
        longitudeDelta: updateLatDelta * 3.5
    }
}

const ViewPackage = (props) => {

    useEffect(() => {
        setLoPackage(props.data.package);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${props.data.country}&key=${'AIzaSyDG4EyiR2isqQEf-BaPVF9w-OtPUwZdtbM'}`).then((res)=>{
            console.log(res.data.results, "asd")
            setRegion(calRegion(res.data.results[0].geometry))
        }).catch(err=>console.error(err));
    }, []);


    const [locPackage, setLoPackage] = useState([]);
    const [directions, setDirections] = useState([]);
    const [region, setRegion] = useState();
    const sheetRef = useRef(null);
    //setLoPackage(props.data.package);
    if (locPackage.length > 1) {
        for (let i = 0; i < locPackage.length - 1; i++) {
            directions.push(
                <MapViewDirections
                    key={i}
                    origin={{ latitude: locPackage[i].latitude, longitude: locPackage[i].longitude }}
                    destination={{ latitude: locPackage[i + 1].latitude, longitude: locPackage[i + 1].longitude }}
                    apikey={'AIzaSyDG4EyiR2isqQEf-BaPVF9w-OtPUwZdtbM'}
                    strokeWidth={6}
                    strokeColor={getRadomColor()}
                />
            );
        }
    } else if (locPackage.length == 1) {
        directions.push(
            <Marker
                key={1}
                coordinate={{
                    latitude: locPackage[0].latitude,
                    longitude: locPackage[0].longitude
                }}
            />
        );
    }


    const renderContent = () => (
        <View style={styles.cardContainer}>
            <View style={[styles.cardContentContainer, { margin: 30 }]}>
                <Text style={styles.cardHeader}>{props.data.title + " Package"}</Text>
                <Text style={styles.cardContent}>{props.data.country + ", " + new Date(props.data.timestamp).toUTCString()}</Text>
                <View style={styles.content}>
                    {locPackage.map((ele, index) => (
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentHeader}>Index {index + 1}</Text>
                            <Text>{ele.address}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={region}
                style={StyleSheet.absoluteFill}
            >
                {directions}

            </MapView>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[300, window.height - 35]}
                initialSnap={0}
                borderRadius={30}
                renderContent={renderContent}
                enabledBottomClamp={true}
                enabledBottomInitialAnimation={true}
                enabledGestureInteraction={true}
                enabledContentGestureInteraction={true}
            />
        </View>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        backgroundColor: 'white',
        padding: 0,
        height: window.height,
    },
    cardContentContainer: {
        alignItems: 'center'
    },
    cardHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    },
    cardContent: {
        color: "grey",
        marginBottom: 15
    },
    content: {
        width: "100%",
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        height: null,
        borderRadius: 5,
        marginTop: 30,
    },
    contentContainer: {
        marginBottom: 20
    },
    contentHeader: {
        fontWeight: 'bold',
        fontSize: 16
    },
})


export default ViewPackage;