import React from 'react';
import Swiper from 'react-native-swiper';
import Home from './view/Home';
import Chat from './view/Chat';
import Camera from './view/Camera';
import Profile from './view/Profile';

const index = () => {
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

export default index;