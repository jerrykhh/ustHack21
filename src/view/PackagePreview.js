import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from 'reanimated-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const window = Dimensions.get('window');


const getRadomColor = () => {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
}

const PackagePreview = (props) => {

    console.log(props)

    const [region, setRegion] = useState({
        latitude: props.data.region.latitude,
        longitude: props.data.region.longitude,
        latitudeDelta: props.data.region.latitudeDelta,
        longitudeDelta: props.data.region.longitudeDelta,
    });

    const [userId, setUserId] = useState(null);
    useEffect(() => {
        AsyncStorage.getItem('userId').then((data) => {
            setUserId(data);
        });
    }, []);

    const sheetRef = useRef(null);

    const [locPackage, setLoPackage] = useState(props.data.locPackage);
    const [count, setCount] = useState(0);
    directions = [];
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

    const createPackage = () => {

        const data = {
            userId : userId,
            package: locPackage,
            title: props.data.name,
            country: props.data.country,
            desc: props.data.desc
        }

        axios.put('https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/package', data).then((res) => {

            const responObj = JSON.stringify(res.data);
            const jsonObj = JSON.parse(responObj);

            if (jsonObj.created){
                Actions.reset("home");
            }else {
                console.log("error")
            }
        }).catch((err) => {
            console.log(err)
        });
    }


    const deletePackage = (index) => {
        locPackage.splice(index, 1);
        console.log(locPackage)
    }

    const upPackage = (index) => {
        if (index - 1 > 0)
            return;
        let updatePackage = locPackage;
        let preTemp = locPackage[index - 1];
        let nowTemp = locPackage[index];
        updatePackage[index - 1] = nowTemp;
        updatePackage[index] = preTemp;
        setLoPackage(updatePackage);
        setCount(count+1);
    }

    const downPackage = (index) => {
        if (index + 1 == locPackage.length)
            return;
        let updatePackage = locPackage;
        let postTemp = locPackage[index + 1];
        let nowTemp = locPackage[index];
        updatePackage[index + 1] = nowTemp;
        updatePackage[index] = postTemp;
        setLoPackage(updatePackage);
        setCount(count+1);
    }


    const renderContent = () => (
        <View style={styles.cardContainer}>
            <View style={[styles.cardContentContainer, { margin: 30 }]}>
                <Text style={styles.cardHeader}>{props.data.name + " Package"}</Text>
                <Text style={styles.cardContent}>{props.data.country}</Text>
                <TouchableOpacity style={styles.cardButton} onPress={createPackage}>
                    <Text style={styles.cardButtonText}>Create Package</Text>
                </TouchableOpacity>
                <View style={styles.content}>
                    {locPackage.map((ele, index) => (
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentHeader}>Index {index + 1}</Text>
                            <Text>{ele.address}</Text>
                            {(index != 0) ?
                                <TouchableOpacity style={styles.contentButton} onPress={() => { upPackage(index); setCount(count + 1); }}>
                                    <Text style={styles.contentButtonText}>Move Up</Text>
                                </TouchableOpacity>
                                : <View></View>}
                            <TouchableOpacity style={[styles.contentButton, { backgroundColor: 'red' }]} onPress={() => { deletePackage(index); setCount(count + 1); }}>
                                <Text style={styles.contentButtonText}>Delete</Text>
                            </TouchableOpacity>
                            {(index < locPackage.length - 1) ?
                                <TouchableOpacity style={styles.contentButton} onPress={() => { downPackage(index); setCount(count + 1); }}>
                                    <Text style={styles.contentButtonText}>Move down</Text>
                                </TouchableOpacity>
                                : <View></View>}
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
                {(directions!= null)? directions:<></>}

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
        flex: 1
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
    contentButton: {
        backgroundColor: '#0095f6',
        borderRadius: 3,
        width: "70%",
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    contentButtonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '600'
    }
})

export default PackagePreview;