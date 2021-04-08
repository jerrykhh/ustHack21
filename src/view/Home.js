import React, { Component, useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import axios from 'axios';
import PackageCard from '../components/PackageCard';

const window = Dimensions.get('window');

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


    const renderContent = () => (
        (selectedMarker==null)?
        <View
            style={styles.bottomSheet}
        >
            <Text>Swipe down to close</Text>
        </View>
        :
        <View style={styles.cardContainer}>
                    <PackageCard 
                        getPackageCount={getLocPackageCount} 
                        props={selectedMarker} 
                        scrollIndex={onOpenBottomSheetHandler}
                        view={true}
                        empty={selectedEmptyMarker}
                    />
                </View>
        
    );

    const sheetRef = React.useRef(null);
    const [region, setRegion] = useState({
        latitude: 22.307072,
        longitude: 114.252853,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
    });
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedEmptyMarker, setEmptyMarker] = useState(null);

    const onOpenBottomSheetHandler = (index) => {
        sheetRef.current.snapTo(0);
    }


    useEffect(() => {

        getMarker();

    },[]);


    const getMarker = () => {
        const lat = region.latitude;
        const lng = region.longitude;
        console.log(lat, lng);
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
    }

    const getLocPackageCount = () => {
        return 0;
    }


    const clickMarker = (event) => {
        for (let i = 0; i < markers.length; i++) {
           // console.log(markers[i].id, event.nativeEvent.id);
            if (markers[i].id == event.nativeEvent.id) {
                setSelectedMarker(markers[i]);
                onOpenBottomSheetHandler(2);
                break;
            }
        }
    }

    const clickEmptyMarker = (coord) => {
        console.log(coord);
    }




    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'papayawhip',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <MapView
                    style={[StyleSheet.absoluteFillObject, { marginLeft: 5, marginRight: 5 }]}
                    initialRegion={region}
                    onRegionChangeComplete={(region) => {
                        setRegion(region);

                        //getMarker(); Fucking Like DDos set timeout
                    }}
                    onLongPress={(event) => {
                        //console.log(coordinate, position);
                        setSelectedMarker({
                            lat: event.nativeEvent.coordinate.latitude,
                            lng: event.nativeEvent.coordinate.longitude
                        });
                        setEmptyMarker(true);
                    }}
                >

                    {markers.map((marker, index) => (
                        <Marker identifier={marker.id}
                            key={marker.id}
                            image={require("../components/image/marker.png")}
                            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                            onPress={(event) => { setEmptyMarker(false); clickMarker(event) }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                <Image resizeMode="cover" style={{ width: 105, height: 70, margin: 30, marginTop: 16, borderRadius: 5 }} source={{ uri: marker.image }} />
                            </View>
                        </Marker>
                    ))}

                </MapView>
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[window.height - 35, 300, 150]}
                initialSnap={1}
                borderRadius={30}
                renderContent={renderContent}
            />
        </>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomSheet: {
        height: window.height - 35,
        padding: 16,
        backgroundColor: 'white'
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

})

export default Home;