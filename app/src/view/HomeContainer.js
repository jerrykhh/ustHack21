import React from 'react';
import Swiper from 'react-native-swiper';
import Home from './Home';
import Chat from './Chat';
import CameraPage from './CameraPage';
import Profile from './Profile';
import Menu from '../components/Menu'

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
/*
const SubMenu = () => (
    <Menu
      routes={[
        { component: Home },
        { component: CameraPage }
      ]}
      horizontal={false}
    />
  );
  
  const HomeContainer = () => {
    return (
      <Menu
        routes={[
          { component: Chat },
          { component: SubMenu },
          { component: Profile },
        ]}
        initialIndex={1}
      />
    );
  };

*/

export default HomeContainer;