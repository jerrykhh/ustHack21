import React from 'react';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const PackageCreator = (props) => {
    console.log(props.id);
    return (
        <View style={styles.container}>
            <Text>Package Creator</Text>
            <Button title="back" onPress={() => Actions.pop()}></Button>
        </View>
    )

}

export default PackageCreator;