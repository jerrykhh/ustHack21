import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PackageImafeContainer from './PackageImageContainer';

const PackageCard = (props) => {

    const data = {
        mainImage: ''
    }

    console.log(props)

    return (
        <View style={styles.container}>
            <PackageImafeContainer/>
            <View style={styles.contentContainer}>
                <View style={styles.eventButtonContainer}>
                    <TouchableOpacity style={styles.eventButton} onPress={()=> props.onChange()}>
                        <Text style={styles.eventButtonText}>Add To Package</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eventButton}>
                        <Text style={styles.eventButtonText}>Street View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection:'column',
    },
    eventButtonContainer: {
        marginLeft: 40,
        marginRight: 40,
    },
    eventButton:{
        backgroundColor: '#0095f6',
        padding: 12,
        borderRadius: 3,
        marginBottom: 20,
        alignContent: 'center',
        alignItems: 'center'
    },
    eventButtonText:{
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    },
    contentContainer:{
        flex: 1
    }

});

export default PackageCard;