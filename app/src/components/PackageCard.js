import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import PackageImageContainer from './PackageImageContainer';
import { Actions } from 'react-native-router-flux';

const PackageCard = (params) => {



    useEffect(() => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${params.props.lat},${params.props.lng}&key=${''}`)
            .then((res) => {
                const results = res.data.results[0];
                let addressBuilder = "";
                const titleBuilder = results.address_components[results.address_components.length - 3].long_name + ", " + results.address_components[results.address_components.length - 2].long_name
                for (let i = 0; i < results.address_components.length - 1; i++) {
                    addressBuilder += results.address_components[i].short_name + " ";
                }
                setInformation({
                    title: titleBuilder,
                    address: addressBuilder
                })

            }).catch((error) => {
                console.log(error)
            });

        return () => {
            setInformation({
                title: "",
                address: ""
            })
        };
    }, [params.props]);


    const [information, setInformation] = useState({
        title: "",
        address: ""
    })

    //console.log(params)

    const streetView = () => {
        
        Actions.push("street", {lat: params.props.lat, lng:params.props.lng})

    }

    return (
        <View style={styles.container}>
            <View style={[styles.cardContentContainer, { margin: 30 }]}>
                <Text style={styles.cardHeader}>{information.title}</Text>
                <Text style={[styles.cardContent, { marginBottom: -10 }]}>{information.address}</Text>
            </View>
            {(!params.empty)?
            <PackageImageContainer data={params.props} />
            :<></>}
            <View style={styles.contentContainer}>
                <View style={styles.eventButtonContainer}>
                    {(!params.view)?
                    <TouchableOpacity style={styles.eventButton} onPress={() => {
                        params.onChange(information.title, information.address, params.props.lat, params.props.lng)
                        params.scrollIndex(1)
                    }}>
                        <Text style={styles.eventButtonText}>Add To Package</Text>
                    </TouchableOpacity>
                    :<></>}
                    {(params.getPackageCount() > 0) ?
                        <TouchableOpacity 
                            style={[styles.eventButton, {backgroundColor: 'black'}]}
                            onPress={() => {
                                params.scrollIndex(1)
                                params.onFinish()
                                }
                            }
                        >
                            <Text style={styles.eventButtonText}>Finish Package</Text>
                        </TouchableOpacity>
                      : <View></View>
                    }
                    <TouchableOpacity style={styles.eventButton} onPress={() => streetView()}>
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
        flexDirection: 'column',
    },
    eventButtonContainer: {
        marginLeft: 40,
        marginRight: 40,
    },
    eventButton: {
        backgroundColor: '#0095f6',
        padding: 12,
        borderRadius: 3,
        marginBottom: 20,
        alignContent: 'center',
        alignItems: 'center'
    },
    eventButtonText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 1
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

});

export default PackageCard;