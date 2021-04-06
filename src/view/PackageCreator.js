import React, { useRef, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import GooglePlacesAutocomplete from '../components/GooglePlacesInput';
import BottomSheet from 'reanimated-bottom-sheet';
import PackageCard from '../components/PackageCard';


const window = Dimensions.get('window');

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
    cardButton: {
        backgroundColor: '#0095f6',
        borderRadius: 3,
        width: "80%",
        alignItems: 'center',
        padding: 8
    },
    cardButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
});

const PackageCreator = (props) => {

    const northeast = props.inf.location.geometry.viewport.northeast;
    const southwest = props.inf.location.geometry.viewport.southwest;
    const latDelta = northeast.lat - southwest.lat;
    const lngDelta = latDelta * 0.922;

    const [nowLocation, setNowLocation] = useState({
        latitude: 0.0,
        longitude: 0.0
    });

    const [init, setInit] = useState(false);
    const [locPackage, setPackage] = useState([]);
    const sheetRef = useRef(null);

    const onOpenBottomSheetHandler = (index) => {
        sheetRef.current.snapTo(index);
    };

    const addToPackage = () => {
        locPackage.push({latitude: nowLocation.latitude, longitude:nowLocation.longitude});
    }

    const renderContent = () => (
        (!init) ?
            <View style={styles.cardContainer}>
                <View style={[styles.cardContentContainer, { margin: 30 }]}>
                    <Text style={styles.cardHeader}>{props.inf.name + " Package"}</Text>
                    <Text style={styles.cardContent}>{props.inf.location.address}</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={() => {setInit(true)}}>
                        <Text style={styles.cardButtonText}>Let's start</Text>
                    </TouchableOpacity>
                </View>

            </View> :
            (nowLocation.latitude != 0.0 && nowLocation.longitude != 0.0) ?
                <View style={styles.cardContainer}>
                    <View style={[styles.cardContentContainer, { margin: 30 }]}>
                        <Text style={styles.cardHeader}>Test</Text>
                        <Text style={[styles.cardContent, {marginBottom: -10}]}>location</Text>
                    </View>
                    <PackageCard onChange={addToPackage}/>
                </View>
                :
                <View></View>
    )

    return (
        <View style={styles.container} >
            <MapView style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: props.inf.location.geometry.location.lat,
                    longitude: props.inf.location.geometry.location.lng,
                    latitudeDelta: latDelta,
                    longitudeDelta: lngDelta
                }}
                onPress={(event) => {
                    console.log(event.nativeEvent.coordinate);
                    console.log(event.nativeEvent.position);
                    setNowLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude
                    })
                    console.log("now")
                    console.log(nowLocation);
                    onOpenBottomSheetHandler(1);
                }}
            />

            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete props={{ styles: null }} />
            </View>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[0, 150, window.height - 35]}
                initialSnap={1}
                borderRadius={30}
                renderContent={renderContent}
                enabledBottomClamp={true}
                enabledBottomInitialAnimation={true}
                enabledGestureInteraction={init}
                enabledContentGestureInteraction={init}
            />


        </View >
    )

};

export default PackageCreator;