import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const Chat = () => {
    return (
        <View style={styles.container}>
            <Text>Chat page</Text>
        </View>
    )
}

export default Chat;