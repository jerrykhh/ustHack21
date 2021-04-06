import React, { Component, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: "10%",
        height: "90%"
    },
    loginContainer: {
        margin: 40,
        marginTop: "30%"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    input: {
        padding: 15,
        marginTop: 30,
        marginBottom: 5,
        borderRadius: 8,
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        backgroundColor: '#fafafa'
    },
    btnContainer: {
        backgroundColor: 'black',
        height: 50,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 30,
        alignSelf: 'flex-end'
    },
    txtLogin: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    errorMes: {
        marginTop: 20,
        alignSelf: 'center',
        color: 'red',
    }
})

const Login = () => {

    const [userLoginData, setLogin] = useState({
        username: '',
        password: ''
    })

    const [errorMes, setErrorMes] = useState("");

    const handleLogin = () => {
        if (userLoginData.username == "" || userLoginData.password == "")
            setErrorMes("Missing the username or password.");
        else {
            axios.post('https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/login', userLoginData)
                .then((res) => {
                    let responObj = JSON.stringify((res.data));
                    const jsonObj = JSON.parse(responObj);
                    if(jsonObj.login){
                        //
                        try{
                            storeData(jsonObj.id).then(() => {
                                Actions.replace('home');
                            }).catch((err) => {
                                console.log(err);
                            })
                            
                        }catch(e){
                            console.log("store failed")
                        }
 
                    }else
                        setErrorMes("wrong username or password. ");
                    
                }).catch((err) => {
                    console.log(err)
                    setErrorMes("Error: Missing the username or password.");
                });
        }
    }

    const storeData = async (value) => {
        try{
            await AsyncStorage.setItem('userId', value.toString());
        }catch(e){
            console.log("save failed");
        }
    }

    const handleChange = (key, value) => {
        let data = userLoginData;
        data[key] = value;
        setLogin(data);
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Wellcome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='username'
                        onChangeText={value => {
                            handleChange('username', value)
                        }}>
                    </TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        secureTextEntry
                        onChangeText={
                            value => {
                                handleChange('password', value)
                            }}>
                    </TextInput>
                    <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={handleLogin}>
                        <Text style={styles.txtLogin}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.errorMes}>{(errorMes != "") ? errorMes : ""}</Text>
                </View>
            </View>
        </SafeAreaView>
    );

}

export default Login;