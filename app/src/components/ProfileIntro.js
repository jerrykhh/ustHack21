import React from 'react';
import {View, StyleSheet, Image, SafeAreaView} from 'react-native';


const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    icon: {
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: '#5b5b5b',
        borderWidth: 0.5
    }
});


const ProfileIntro = (props) =>{

    return (
        <SafeAreaView>
            <View>
                <Image style={styles.icon} source={{uri: 'https://scontent.fhkg10-1.fna.fbcdn.net/v/t31.18172-8/11728822_651816411621365_6989222180898603270_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=zKDO1viBfbsAX_7SgEu&_nc_ht=scontent.fhkg10-1.fna&oh=df1c7b3ca31d2b42c55a7f2911eecf77&oe=608FD168'}}/>
            </View>
        </SafeAreaView>
         
    );
    
}

export default ProfileIntro;