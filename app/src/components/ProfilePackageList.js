import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    item:{
        paddingTop: 16 ,
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        paddingBottom: 16,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemDesc: {
        fontSize: 12
    },
    btnText:{
        color: 'white'
    },
    createPackageButton:{
        backgroundColor: '#0095f6',
        borderRadius: 3,
        width: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
    btnContainer:{
        padding: 10,
        justifyContent: 'center',
        alignItems:'center'
    }
    
})

const ProfilrPackageList = (props) => {


    /*const [trips, setTrips] = useState([
        {
            id: 1,
            title: "Taiwan",
            desc: "Taipei"
        },
        {
            id: 2,
            title: "Japan",
            desc: "Osaka"
        }
    ]);*/

    //console.log(props);


    const viewPackage = (dataObj) => {
        Actions.viewPackage({data: dataObj});
    }


    return (
            <View style={styles.container}>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.createPackageButton} onPress={() => {Actions.initPackage()}}>
                        <Text style={styles.btnText}>Create Package</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    data={props.data}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => viewPackage(item)}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDesc}>{item.country}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
    )

}

export default ProfilrPackageList;