import React from 'react';
import Swiper from 'react-native-swiper';
import Home from './Home';
import Chat from './Chat';
import Camera from './Camera';
import Profile from './Profile';

const HomeContainer = () => {
    return (
       <Swiper
        loop={false}
        showsPagination={false}
        index={1}>
            <Chat></Chat>
            <Swiper
                horizontal={false}
                showsPagination={false}
                loop={false}
                index={1}>
                    <Camera></Camera>
                    <Home></Home>
            </Swiper>
            <Profile></Profile>
        </Swiper>
    );

}

export default HomeContainer;