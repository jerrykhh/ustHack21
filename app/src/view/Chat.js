import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import MapView, {Marker} from 'react-native-maps';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        padding: 25,
        height: window.height
    },
    contextContainer: {
        flex: 1,
        height: 100
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
    header:{
        fontSize: 22,
        fontWeight: '700'
    }
})

const Chat = () => {

    const [friends, setFriends] = useState([]);
    const [userId, setUserId] = useState(null);


    useEffect(() => {

         AsyncStorage.getItem('userId').then((data) => {
            setUserId(data);
            axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/friend?userId=${data}&detail=true`).then((res) => {

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


    const chatRoom = (goId) => {
        console.log(goId)
        Actions.chatRoom({userId, goId});
    }

    return (
        <SafeAreaView>
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Friends Chat</Text>
            <View style={styles.itemContainer}>
                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.userId}
                    data={friends}
                    renderItem={({ item }) => (
                        <>
                        <TouchableOpacity onPress={() => {console.log(item.username, item.userId);chatRoom(item.userId)}}>
                        <View style={styles.item}>
                            <View style={styles.userInfContainer}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                            </View>
                            <View style={styles.username}>
                                <Text style={{ fontWeight: '700' }}>{item.username}</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        {(item.lat && item.lng) ? 
                        <View>
                            <MapView 
                                style={{width: '100%', height: 200, borderRadius: 20, marginTop: 20, marginBottom: 20}}
                                region={{latitude: item.lat, longitude: item.lng, latitudeDelta: 0.2, longitudeDelta: 0.2}}
                            >
                                <Marker coordinate={{latitude: item.lat, longitude: item.lng}}></Marker>

                            </MapView>
                        </View>
                        : <></>}
                        </>
                        
                    )}
                />
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default Chat;