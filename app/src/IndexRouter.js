import React from 'react';
import {LogBox} from 'react-native';
import {Scene, Router, Stack} from 'react-native-router-flux';
import Login from './view/Login';
import HomeContainer from './view/HomeContainer';
import PackageCreator from './view/PackageCreator';
import initPackageCreator from './view/initPackageCreator';
import PackagePreview from './view/PackagePreview';
import Chat from './view/Chat';
import CameraReview from './view/CameraReview';
import Chatroom from './view/ChatRoom';
import ImageView from './view/ImageView';
import ViewPackage from './view/ViewPackage';
import StreetViewController from './components/StreetViewController'

LogBox.ignoreAllLogs();

const IndexRouter = () => {
    return (
        <Router>
            <Scene key="root" >
                <Scene key="login" component={Login} hideNavBar={true} initial={true}/>
                <Scene key="home" component={HomeContainer}  hideNavBar={true} />
                <Scene key="package" component={PackageCreator} headerMode="float" hideNavBar={true}/>
                <Scene key="initPackage" component={initPackageCreator} hideNavBar={true} /> 
                <Scene key="review"  component={PackagePreview} hideNavBar={true} />
                <Scene key="chat" component={Chat} hideNavBar={true}/>
                <Scene key="cameraReview" component={CameraReview} back={true} title="Photo" />
                <Scene key="chatRoom" component={Chatroom} back={true} title="Chatroom" />
                <Scene key="image" component={ImageView} back={true} title="Photo" />
                <Scene key="viewPackage" component={ViewPackage} back={true} title="Package"/>
                <Scene key="street" component={StreetViewController} back={true} title="Street View"/>
            </Scene> 
        </Router>
        /*<Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="home" component={Profile} />
            </Scene>
        </Router>*/
    );

}

export default IndexRouter;