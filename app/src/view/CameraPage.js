import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { Actions } from 'react-native-router-flux';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        bottom: window.height / 6
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    circle: {
        width: window.width / 5,
        height: window.width / 5,
        borderRadius: 40,
        backgroundColor: 'white'
    }
});

const reviewStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: window.width,
        height: window.height,
    },
    nav: {
        position: 'absolute',
        flexDirection: 'row'
    }
});

const CameraPage = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {

        (async () => {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            setLocation(location);
        })();

        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');

        })();


    }, []);

    if (hasPermission === null)
        return <View />;

    if (hasPermission === false)
        return <Text>No access to camera</Text>;

    const takePicture = async () => {
        if (cameraRef) {
            const options = { exif: true, quality: 0.4, base64: true };
            const data = await cameraRef.takePictureAsync(options);
            console.log(data);
            setPhoto(data)
        }
    };

    const savePic = () => {

        const coords = location.coords;

        console.log(coords)
        Actions.push('cameraReview',{ data: { coords, photo } });
    }


    return (
        (photo != null) ?
            <>
                <View style={reviewStyle.container}>
                    <Image style={reviewStyle.img} source={{ uri: photo.uri }} />
                </View>
                <View style={reviewStyle.nav}>
                    <TouchableOpacity onPress={() => setPhoto(null)}>
                        <Text style={{ color: 'white', fontSize: 40, marginTop: 60, marginLeft: 30 }}>X</Text>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity onPress={savePic}>
                            <Text style={{ color: 'white', fontSize: 20, marginTop: 75, marginLeft: window.width / 2 + 70 }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
            :
            <View style={styles.container}>
                <Camera ref={ref => setCameraRef(ref)} style={styles.camera} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.photoButton}
                            onPress={async () => {
                                takePicture()
                            }}>
                            <View style={styles.circle}></View>
                        </TouchableOpacity>
                    </View>

                </Camera>
            </View>
    );



}

export default CameraPage;