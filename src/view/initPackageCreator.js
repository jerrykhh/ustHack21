import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import GooglePlacesAutocomplete from '../components/GooglePlacesInput';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boradImageContainer: {
        width: "100%",
        height: "30%"
    },
    boardImage:{
        width: "100%",
        height: "100%"
    },
    contentContainer: {
        position: 'absolute',
        backgroundColor: "white",
        borderRadius: 30,
        marginTop: "50%",
        width: "100%",
        height: "100%",
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40
    },
    context:{
        marginTop: 20
    },
    header:{
        fontSize: 16
    },
    searchContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: "100%",
        marginTop: 125,
        zIndex: 999
    },
    input:{
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 3,
        fontSize: 14,
        marginTop: 20,
        marginBottom: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15
    },
    btnNext:{
        backgroundColor: 'black',
        color: 'white',
        padding: 13,
        width: 70,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginTop: "35%",
        zIndex: -1
    },
    txtNext:{
        color: 'white',
        fontWeight: 'bold'
    },
    textView:{
        height: 100
    },
    errMess: {
        alignSelf: 'center',
        color: 'red',
    }
})

const initPackageCreator = () => {


    const [packageInf, setPackageInf] = useState({
        name: "",
        location: "",
        desc: ""
    })

    const [errMess, setErrMess] = useState("");

    const handleGoolgePlaceChange = e => {
        packageInf.location = {
            address: e.address.description,
            geometry: e.geometry
        };
    }

    const updatePackage = (key, value) => {
        let data = packageInf;
        data[key] = value;
        setPackageInf(data);
    }

    const clickNext = () =>{
        if(packageInf.name == '' || packageInf.location == '')
            setErrMess("Missing name and location")
        else{
            Actions.package({inf: packageInf});
        } 
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.boradImageContainer}>
                <Image style={styles.boardImage} source={{ uri: 'https://www.qualcomm.com/sites/ember/files/styles/optimize/public/blog/managed-images/qc_onq_ai-travel-companion_header_1a.png?itok=bJEwP13V' }} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.context}>
                    <Text style={styles.header}>Please input you package name</Text>
                    <TextInput style={styles.input} placeholder="Name" onChangeText={value => {updatePackage('name', value)}}></TextInput>
                    <Text style={styles.header}>Location</Text>
                    <View style={styles.searchContainer}>
                        <GooglePlacesAutocomplete 
                            props={
                                {  
                                    styles: {
                                        textInput:{
                                            borderRadius: 3,
                                            borderWidth: 1,
                                            borderColor: 'grey'
                                        }
                                    }
                                }
                            }
                            onChange={handleGoolgePlaceChange}
                        />
                    </View>
                    <Text style={styles.header, {marginTop: styles.searchContainer.marginTop - 35}}>Description</Text>
                    <TextInput style={[styles.input, styles.textView]} multiline={true} placeholder="Description" onChangeText={value => {updatePackage('desc', value)}}></TextInput>
                    <Text style={styles.errMess}>{(errMess != "") ? errMess : ""}</Text>
                </View>
                <TouchableOpacity style={styles.btnNext} onPress={clickNext}>
                    <Text style={styles.txtNext}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default initPackageCreator;