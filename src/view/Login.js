import React, {Component, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import {View, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';


const styles = StyleSheet.create({
    container:{
        margin: 50,
        marginTop: '35%'
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
        borderWidth: 0.5
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
        if(userLoginData.username == "" || userLoginData.password == "")
            setErrorMes("Missing the username or password.");
        else{
            Actions.replace('home');
        }
    }

    const handleChange = (key, value) => {
        let data = userLoginData;
        data[key] = value;
        setLogin(data);
    }

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Wellcome</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Username' 
                    onChangeText={value => {
                        handleChange('username', value)
                    }}>
                </TextInput>
                <TextInput 
                    style={styles.input} 
                    placeholder="password" 
                    secureTextEntry 
                    onChangeText={
                        value => {handleChange('password', value)
                    }}>
                </TextInput>
                <TouchableOpacity  
                    style={styles.btnContainer} 
                    onPress={handleLogin}>
                        <Text style={styles.txtLogin}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.errorMes}>{(errorMes != "")? errorMes: ""}</Text>
            </View>
        </SafeAreaView>
    );

}

export default Login;