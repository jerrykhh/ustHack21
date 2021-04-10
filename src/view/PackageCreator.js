import React, { useRef, useState, useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, Button, TouchableOpacity, Keyboard, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
});

const radio = 0.222;

const PackageCreator = (props) => {

    const northeast = props.inf.location.geometry.viewport.northeast;
    const southwest = props.inf.location.geometry.viewport.southwest;
    const latDelta = northeast.lat - southwest.lat;
    const lngDelta = latDelta * radio;

    const [nowLocation, setNowLocation] = useState({
        latitude: 0.0,
        longitude: 0.0,
    });

    const [selectedMarker, setSelectedMarker] = useState(null);

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const lat = props.inf.location.geometry.location.lat;
        const lng = props.inf.location.geometry.location.lng;
        axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/gallery?lat=${lat}&lng=${lng}&km=${55}`).then((res) => {
            console.log(res.data);
            const responObj = JSON.stringify(res.data);
            const jsonObj = JSON.parse(responObj);
            console.log(jsonObj);
            setMarkers(jsonObj.locations);
            console.log(markers);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [region, setRegion] = useState({
        latitude: props.inf.location.geometry.location.lat,
        longitude: props.inf.location.geometry.location.lng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta
    })

    const [init, setInit] = useState(false);
    const [locPackage, setPackage] = useState([]);
    const sheetRef = useRef(null);

    const onOpenBottomSheetHandler = (index) => {
        sheetRef.current.snapTo(index);
    };

    const getLocPackageCount = () => {
        return locPackage.length;
    }

    const addToPackage = (packageTitle = null, packageAddress = null, lat = null, lng = null) => {
        (lat == null && lng == null && packageTitle == null && packageAddress == null) ?
            locPackage.push({ latitude: nowLocation.latitude, longitude: nowLocation.longitude })
            :
            locPackage.push({ title: packageTitle, address: packageAddress, latitude: lat, longitude: lng });
    }

    const moveRegion = (object) => {
        setRegion(calRegion(object.geometry));
    }

    const [cacheRegion, setCacheRegion] = useState();
    const clickMarker = (event) => {
        setCacheRegion(region);
        setRegion(cacheRegion);
        for (let i = 0; i < markers.length; i++) {
            console.log(markers[i].id, event.nativeEvent.id);
            if (markers[i].id == event.nativeEvent.id) {
                setNowLocation({
                    latitude: markers[i].lat,
                    longitude: markers[i].lng,
                    markerClick: true
                });
                console.log(nowLocation, "nowLOca")
                setSelectedMarker(markers[i]);
                onOpenBottomSheetHandler(2);
                break;
            }
        }

    }

    const calRegion = (geometry) => {

        const northeast = geometry.viewport.northeast;
        const southwest = geometry.viewport.southwest;
        const updateLatDelta = northeast.lat - southwest.lat;

        return {
            latitude: geometry.location.lat,
            longitude: geometry.location.lng,
            latDelta: updateLatDelta,
            lngDelta: updateLatDelta * radio
        }
    }

    clickFinish = () => {
        console.log('click finish')
        console.log(props);
        const name = props.inf.name;
        const country = props.inf.location.address;
        const region = {
            latitude: locPackage[0].latitude,
            longitude: locPackage[0].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01

        };
        console.log(region);
        Actions.review({ data: { region, locPackage, name, country } });
    }


    const renderContent = () => (
        (!init) ?
            <View style={styles.cardContainer}>
                <View style={[styles.cardContentContainer, { margin: 30 }]}>
                    <Text style={styles.cardHeader}>{props.inf.name + " Package"}</Text>
                    <Text style={styles.cardContent}>{props.inf.location.address}</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={() => { setInit(true) }}>
                        <Text style={styles.cardButtonText}>Let's start</Text>
                    </TouchableOpacity>
                </View>
            </View> :
            (nowLocation.latitude != 0.0 && nowLocation.longitude != 0.0 && nowLocation.markerClick) ?
                <View style={styles.cardContainer}>
                    <PackageCard
                        getPackageCount={getLocPackageCount}
                        onChange={addToPackage}
                        props={selectedMarker}
                        onFinish={clickFinish}
                        scrollIndex={onOpenBottomSheetHandler}
                    />
                </View>
                :
                <View></View>
    )

    return (
        <View style={styles.container} >
            <MapView style={{ flex: 1 }}
                initialRegion={region}
                region={region}
                onLongPress={(event) => {
                    Keyboard.dismiss();
                    console.log(event.nativeEvent.coordinate);
                    console.log(event.nativeEvent.position);
                    /*setNowLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                    })*/
                    console.log("now")
                    console.log(nowLocation);
                    setInit(true)
                    onOpenBottomSheetHandler(1);
                }}
                onRegionChangeCompleted={region => setRegion(region)}

            >
                {markers.map((marker, index) => (
                    <Marker identifier={marker.id}
                        tracksViewChanges={false}
                        key={marker.id}

                        image={require("../components/image/marker.png")}
                        onPress={(event) => { }}
                        coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                        onPress={(event) => { clickMarker(event) }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                            <Image resizeMode="cover" style={{ width: 105, height: 70, margin: 30, marginTop: 16, borderRadius: 5 }} source={{ uri: marker.image }} />
                        </View>
                    </Marker>
                ))}

            </MapView>



            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete props={{ styles: null }} onChange={moveRegion} />
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