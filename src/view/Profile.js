import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile page</Text>
        </View>
    )
}

export default Profile;