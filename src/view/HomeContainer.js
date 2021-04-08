import React from 'react';
import Swiper from 'react-native-swiper';
import Home from './Home';
import Chat from './Chat';
import CameraPage from './CameraPage';
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
                index={0}>
                    <Home></Home>
                    <CameraPage></CameraPage>
            </Swiper>
            <Profile></Profile>
        </Swiper>
    );

}

export default HomeContainer;