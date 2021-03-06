import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

const PackageImafeContainer = (props) => {

    /*const data = [
        {
            id: 1,
            image: 'https://scontent.fhkg10-1.fna.fbcdn.net/v/t31.18172-8/p843x403/19621231_448615218828935_8468480031804681748_o.jpg?_nc_cat=104&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=2sNIhrrvpBsAX_uIyqp&_nc_ht=scontent.fhkg10-1.fna&tp=6&oh=ffc724fd5d38cbc61e9c7845fbb1fe1b&oe=609131F6'
        },
        {
            id: 2,
            image: 'https://scontent.fhkg10-1.fna.fbcdn.net/v/t31.18172-8/p843x403/19621231_448615218828935_8468480031804681748_o.jpg?_nc_cat=104&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=2sNIhrrvpBsAX_uIyqp&_nc_ht=scontent.fhkg10-1.fna&tp=6&oh=ffc724fd5d38cbc61e9c7845fbb1fe1b&oe=609131F6'
        },
        {
            id: 3,
            image: 'https://scontent.fhkg10-1.fna.fbcdn.net/v/t31.18172-8/p843x403/19621231_448615218828935_8468480031804681748_o.jpg?_nc_cat=104&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=2sNIhrrvpBsAX_uIyqp&_nc_ht=scontent.fhkg10-1.fna&tp=6&oh=ffc724fd5d38cbc61e9c7845fbb1fe1b&oe=609131F6'
        },
        {
            id: 4,
            image: 'https://scontent.fhkg10-1.fna.fbcdn.net/v/t31.18172-8/p843x403/19621231_448615218828935_8468480031804681748_o.jpg?_nc_cat=104&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=2sNIhrrvpBsAX_uIyqp&_nc_ht=scontent.fhkg10-1.fna&tp=6&oh=ffc724fd5d38cbc61e9c7845fbb1fe1b&oe=609131F6'
        }
    ]*/


    let scrollImageItems = [];


    for (let i = 0; i < props.data.images.length; i++)
        scrollImageItems.push(
        <TouchableOpacity style={styles.imageButton} onPress={() => pushImage(props.data.images[i].id)}>
            <Image style={styles.scrollImageItem} resizeMode="cover" key={props.data.images[i].id} source={{ uri: props.data.images[i].image }} />
        </TouchableOpacity>
        );

    const pushImage = (imageId) => {
        Actions.image({imageId});
    }

    console.log(props.data)
    return (
        <View style={styles.container}>
                <TouchableOpacity style={styles.imageButton} onPress={() => {pushImage(props.data.id)}}>
                    <Image resizeMode="contain" style={styles.mainImage} source={{ uri: props.data.image }} />
                </TouchableOpacity>
            {(scrollImageItems.length > 0) ?
            <View style={styles.scrollImageContainer}>
                {scrollImageItems}
            </View>
            : <></>}
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageButton:{
        
        flex : 1
    },
    mainImage: {
        flex: 1,
        width: "100%",
        height: null
    },
    scrollImageContainer: {
        flex: 0.3,
        flexDirection: 'row',
        borderColor: 'grey',
        justifyContent: 'space-around',
        width: '100%',
        height: null,
        paddingHorizontal: 0.5,
    },
    scrollImageItem: {
        flex: 2,
        width: '100%',
        height: null,
        margin: 5
    },
    contentContainer:{
        flex: 1
    }
    
});

export default PackageImafeContainer;