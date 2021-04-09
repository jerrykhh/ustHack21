import React, {useRef, useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import ProfileIntro from '../components/ProfileIntro';
import ProfilrPackageList from '../components/ProfilePackageList';
import ProfileImageList from '../components/ProfileImageList';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {

    }, 
    profileIntro: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    username:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    profileSwiperContainer: {
        flex: 2
    },
    profileSwiperSelectBar:{
        flexDirection: 'row',
        height: 50,
        marginTop: 40,
        borderColor: 'grey',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    profileSwiperSelectBarItem:{

    }
})

const Profile = (props) => {

    const swiper = useRef(null);
    const [user, setUser] = useState(null);

    const changeSwiper = (index) => {
        swiper.current.scrollTo(index);
    }

    useEffect(() => {
        axios.get("").then((res) => {
            const response = JSON.stringify(res.data);
            const jsonObj = JSON.parse(response);
            if(jsonObj.stateCode == 200)
                setUser(jsonObj.user);

        }).catch(err => {
            console.err(err);
        })
       
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.profileIntro}>
                    <ProfileIntro props={props} ></ProfileIntro>
                    <Text style={styles.username}>@username</Text>
                </View>
                <View style={styles.profileSwiperContainer}>
                    <View style={styles.profileSwiperSelectBar}>
                        <TouchableOpacity style={styles.profileSwiperSelectBarItem} onPress={() => changeSwiper(0)}>
                            <Text>btnPackage</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileSwiperSelectBarItem} onPress={() => changeSwiper(1)}>
                            <Text>btnImages</Text>
                        </TouchableOpacity>
                    </View>
                    <Swiper 
                        ref={swiper}
                        loop={false}
                        showsPagination={false}
                        index={0}>
                        <ProfilrPackageList></ProfilrPackageList>
                        <ProfileImageList></ProfileImageList>
                    </Swiper>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile;