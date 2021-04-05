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
    }
})



const ProfilrPackageList = (props) => {


    const [trips, setTrips] = useState([
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
    ]);


    const viewPackage = (id) => {
        console.log(id);
        Actions.initPackage({id: id});
    }


    return (
            <View style={styles.container}>
                <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    data={trips}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => viewPackage(item.id)}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDesc}>{item.desc}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
    )

}

export default ProfilrPackageList;