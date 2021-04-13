import React, { useRef, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import ProfileIntro from '../components/ProfileIntro';
import ProfilrPackageList from '../components/ProfilePackageList';
import ProfileImageList from '../components/ProfileImageList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as regfaSquare} from '@fortawesome/free-regular-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faImages as regfaImages} from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {

    },
    profileIntro: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    profileSwiperContainer: {
        flex: 2
    },
    profileSwiperSelectBar: {
        flexDirection: 'row',
        height: 50,
        marginTop: 40,
        borderColor: 'grey',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    profileSwiperSelectBarItem: {

    }
})

const Profile = (props) => {

    const swiper = useRef(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const [currentIndex, setCurrentIndesx] = useState(0);

    const changeSwiper = (index) => {
        setCurrentIndesx(index);
        swiper.current.scrollTo(index);
    }

    const onRefresh = React.useCallback(() => {
        getUser(userId)
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
       
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const getUser = (userId) => {
        axios.get(`https://aclog6mgqd.execute-api.us-east-1.amazonaws.com/v1/profile?userId=${userId}`).then((res) => {
            const response = JSON.stringify(res.data);
            const jsonObj = JSON.parse(response);
            console.log(jsonObj, "profilPage");
            setUser(jsonObj.user);
        }).catch(err => {
            console.err(err);
        });
    }

    useEffect(() => {
        AsyncStorage.getItem('userId').then((data) => {
            setUserId(data);
            getUser(data);
        }).catch(err => console.error(err))

    }, []);

    return (
        (user != null) ?
            <SafeAreaView>
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                    <View style={styles.profileIntro}>
                        <ProfileIntro data={{
                            username: user.username,
                            image: user.image
                        }}
                        ></ProfileIntro>
                        <Text style={styles.username}>@{user.username}</Text>
                    </View>
                    <View style={styles.profileSwiperContainer}>
                        <View style={styles.profileSwiperSelectBar}>
                            <TouchableOpacity style={styles.profileSwiperSelectBarItem} onPress={() => changeSwiper(0)}>
                                <FontAwesomeIcon icon={(currentIndex==0)?faSquare: regfaSquare} size={20}/>
    
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileSwiperSelectBarItem} onPress={() => changeSwiper(1)}>
                                <FontAwesomeIcon icon={(currentIndex==1)?faImages: regfaImages} size={20}/>
                            </TouchableOpacity>
                        </View>
                        <Swiper
                            ref={swiper}
                            loop={false}
                            showsPagination={false}
                            index={0}
                            onIndexChanged = {(index) =>{ 
                                console.log(index, "index");
                                setCurrentIndesx(index)
                            }}
                            >
                            <ProfilrPackageList data={user.packages}></ProfilrPackageList>
                            <ProfileImageList data={user.images}></ProfileImageList>
                        </Swiper>
                    </View>
                </ScrollView>
            </SafeAreaView>
            : <></>
    )
}

export default Profile;