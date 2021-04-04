import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const PackageCreator = (props) => {
    console.log(props.id);
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Package Creator</Text>
            </View>
        </SafeAreaView>
    )

}

export default PackageCreator;