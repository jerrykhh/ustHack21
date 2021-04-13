import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import RegionForCoordinates from '../components/getRegionForCoordinates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


const window = Dimensions.get('window');

const LATITUDE_DELTA = 0.0922;

const CameraReview = (props) => {

    console.log(props.data);

    const [userId, setUserId] = useState(null);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userId').then((data) => {
            setUserId(data);
            axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/friend?userId=${data}`).then((res) => {

                console.log(res);
                const responseObj = JSON.stringify(res.data);
                const jsonObj = JSON.parse(responseObj);
                if (jsonObj.stateCode == 200)
                    setFriends(jsonObj.result);
                else
                    console.log(err);
               
            }).catch(err => {
                console.log(err)
            })

        });

    }, []);


    const sendMessage = (id, sendUserId) => {
        const data = {
            userId: id,
            sendId: sendUserId,
            message: {
                content: null,
                image: props.data.photo.base64
            }
        }
        axios.put('https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/message', data).then((res) => {
            console.log(res.data);
            const responseObj = JSON.stringify(res.data);
            const jsonObj = JSON.parse(responseObj);
            console.log(jsonObj)
            if (jsonObj.stateCode == 200 && jsonObj.created) {
                Actions.replace("home");
            }
        })
    }

    const pushPost = () => {

        const data = {
            userId: userId,
            image: props.data.photo.base64,
            lat: props.data.coords.latitude,
            lng: props.data.coords.longitude
        }

        axios.put("https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/gallery", data).then((res) => {
            console.log(res.data);
            const responseObj = JSON.stringify(res.data);
            const jsonObj = JSON.parse(responseObj);
            console.log(jsonObj)
            if (jsonObj.stateCode == 200 && jsonObj.created) {
                Actions.replace("home");
            }
        })
    }



    return (

        <ScrollView style={styles.conentContainer}>


            <View style={styles.photoInfContainer}>
                <Text style={styles.title}>Photo Information</Text>
                <View style={styles.photoInf}>
                    <Text style={styles.photoInfText}>Exif Version {props.data.photo.exif.ExifVersion}</Text>
                    <Text style={styles.photoInfText}>Date: {props.data.photo.exif.DateTimeOriginal}</Text>
                    <Text style={styles.photoInfText}>{props.data.photo.exif.LensModel}</Text>
                    <Text style={styles.photoInfText}>Shutter sPeed: {props.data.photo.exif.ShutterSpeedValue}</Text>
                    <Text style={styles.photoInfText}>White Balance: {props.data.photo.exif.WhiteBalance}</Text>
                </View>
                <MapView
                    style={styles.map}
                    initialRegion={
                        RegionForCoordinates(props.data.coords.latitude, props.data.coords.longitude, props.data.coords.accuracy)
                    }
                    showsCompass={false}
                    zoomControlEnabled={false}
                    zoomTapEnabled={false}
                    zoomTapEnabled={false}

                >
                    <Marker coordinate={{ latitude: props.data.coords.latitude, longitude: props.data.coords.longitude }} />
                </MapView>
            </View>
            <View style={styles.pushButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => pushPost(userId)}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.title, { marginTop: 30 }]}>Friends</Text>
            <View style={styles.itemContainer}>
                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.userId}
                    data={friends}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <View style={styles.userInfContainer}>
                                <Image style={styles.image} source={{ uri: item.image }} />

                            </View>
                            <View style={styles.username}>
                                <Text style={{ fontWeight: '700' }}>{item.username}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(userId, item.userId)}>
                                    <Text style={styles.sendButtonText}>Send</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    conentContainer: {
        padding: 25,
        backgroundColor: 'white'
    },
    photoInfContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
        height: 200,
        borderRadius: 20
    },
    firendContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    photoInf: {
        marginBottom: 20,
    },
    photoInfText: {
        fontSize: 16
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
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20
    },
    sendButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    buttonContainer: { justifyContent: 'center', marginLeft: 90 },
    image: {
        borderRadius: 100,
        width: 50,
        height: 50
    },
    pushButtonContainer: {
        marginTop: 30,
        flex: 1,
        borderRadius: 5
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#0095f6',
        padding: 15,
        width: "100%",
        alignItems: 'center',
        borderRadius: 5
    }

})

export default CameraReview;