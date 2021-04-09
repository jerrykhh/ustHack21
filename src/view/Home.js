import React, { Component, useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Image, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import axios from 'axios';
import PackageCard from '../components/PackageCard';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';

const window = Dimensions.get('window');

const radio = 0.922;
let count = 0;

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

    const createPackage = () => {
        Actions.push('initPackage');
    }

    const renderContent = () => (
        (selectedMarker == null) ?
            <View style={styles.cardContainer}>
                <View style={[styles.cardContentContainer, { margin: 30 }]}>
                    <Text style={styles.cardHeader}>Hello, click the map</Text>
                    <Text style={styles.cardContent}>Find your place now</Text>
                    <TouchableOpacity style={styles.cardButton} 
                        onPress={() => { 
                            radomRegion({
                                latitude: parseFloat(Math.random() * 180  * (Math.round(Math.random()) ? 1 : -1).toFixed(7)),
                                longitude: parseFloat(Math.random() * 180  * (Math.round(Math.random()) ? 1 : -1).toFixed(7)),
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.05
                            });
                            onOpenBottomSheetHandler(2) 
                    }}>
                        <Text style={styles.cardButtonText}>Let's start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cardButton, {marginTop: 30, backgroundColor: 'black'}]} 
                        onPress={() => {
                             onOpenBottomSheetHandler(2);
                             createPackage(); 
                        }}>
                        <Text style={styles.cardButtonText}>Create Package</Text>
                    </TouchableOpacity>
                </View>
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
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedEmptyMarker, setEmptyMarker] = useState(null);

    const onOpenBottomSheetHandler = (index) => {
        sheetRef.current.snapTo(index);
    }


    useEffect(() => {
        getMarker();
    }, []);




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
                onOpenBottomSheetHandler(0);
                break;
            }
        }
    }

    const radomRegion = (regionObject) =>{
        setRegion(regionObject);
        console.log(region)
    }

    const moveRegion = (object) => {
        setRegion(calRegion(object.geometry));
        console.log(region);
    }

    const clickEmptyMarker = (coord) => {
        console.log(coord);
    }

    const goUser = (userId) => {
        console.log(userId);
    }

    /*const searchUser = (text) => {
        axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/user?like=${text}`).then((res) => {
            console.log(res.data);
            const responseObj = JSON.stringify(res.data);
            const jsonObj = JSON.parse(responseObj);
            searchUsers = jsonObj
            console.log(searchUsers, "ASdasdasas")
        }).catch(err => {
            console.log(err);
        })

    }*/

    // console.log(cacheSearchCounter, "counter")


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
                    region={region}
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

            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    placeholder='Search Location'
                    fetchDetails={true}
                    minLength={4}
                    numberOfLines={5}
                    listViewDisplayed={false}
                    keyboardShouldPersistTaps='always'
                    onPress={(data, details = null) => {
                        console.log("click");
                        console.log(data, details);
                        moveRegion({ address: data, geometry: details.geometry });
                    }}
                    query={{
                        key: 'AIzaSyDG4EyiR2isqQEf-BaPVF9w-OtPUwZdtbM',
                        language: 'en',
                    }}

                    /*renderRow={(rawData, index) => {

                        console.log(rawData, index, count++);
                        renderDescription={() => {
                            axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/user?like=${text}`).then((res) => {
                                console.log(res.data);
                                const responseObj = JSON.stringify(res.data);
                                const jsonObj = JSON.parse(responseObj);
                                searchUsers = jsonObj
                                console.log(searchUsers, "ASdasdasas")
                            }).catch(err => {
                                console.log(err);
                            })
                        }}
    
                        renderRow={(rowData) => {
    
    
                            if (cacheSearchCounter < searchUsers.length) {
                                cacheSearchCounter++;
                                console.log('counter ' + cacheSearchCounter);
                                if (cacheSearchCounter < searchUsers.length)
                                    cachePlaces.push(rowData.structured_formatting);
                                return (
                                    <TouchableOpacity onPress={() => goUser(searchUsers[cacheSearchCounter - 1].id)}>
                                        <View style={styles.item}>
                                            <View style={styles.userInfContainer}>
                                                <Image style={styles.image} source={{ uri: searchUsers[cacheSearchCounter - 1].image }} />
                                            </View>
                                            <View style={styles.username}>
                                                <Text style={{ fontWeight: '700' }}>{searchUsers[cacheSearchCounter - 1].username}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
    
                            } else {
                                //console.log(cachePlaces);
                                if (cachePlaces.length == 0) {
                                    const title = rowData.structured_formatting.main_text;
                                    return (
                                        <View>
                                            <Text>{title}}</Text>
                                        </View>
                                    )
                                }
    
                                console.log("else", cacheSearchCounter)
                                const title = cachePlaces[0].main_text;
                                cachePlaces.splice(0, 1);
                                if (cacheSearchCounter == searchUsers.length && cachePlaces.length == 0)
                                    cacheSearchCounter = 0;
                                return (
                                    <View>
                                        <Text style={{ fontSize: 14 }}>{title}</Text>
                                    </View>
                                )
    
    
                            }
    
                            //console.log(rowData);
                        }}
                    }}*/

                />
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
        width: "70%",
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
    searchContainer: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 50,
        width: Dimensions.get('window').width - 30,
    },
    itemContainer: {
        flex: 1,
        margin: 20,
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 0.5,

    },
    item: {
        flex: 1,
        paddingTop: 16,
        flexDirection: 'row',
    },
    username: {
        justifyContent: 'center',
        marginLeft: 10
    },
    image: {
        borderRadius: 100,
        width: 50,
        height: 50
    },

})


const calRegion = (geometry) => {

    const northeast = geometry.viewport.northeast;
    const southwest = geometry.viewport.southwest;
    const updateLatDelta = northeast.lat - southwest.lat;

    return {
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
        latitudeDelta: updateLatDelta,
        longitudeDelta: updateLatDelta * radio
    }
}

export default Home;