import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const Camera = () => {
    return (
        <View style={styles.container}>
            <Text>Camera page</Text>
        </View>
    )
}

export default Camera;