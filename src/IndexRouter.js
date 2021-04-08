import React from 'react';
import {Text} from 'react-native';
import {Scene, Router, Stack} from 'react-native-router-flux';
import Login from './view/Login';
import HomeContainer from './view/HomeContainer';
import PackageCreator from './view/PackageCreator';
import initPackageCreator from './view/initPackageCreator';
import PackagePreview from './view/PackagePreview';
import CameraPage from './view/CameraPage';
import CameraReview from './view/CameraReview'

const IndexRouter = () => {
    return (
        <Router>
            <Scene key="root" >
                <Scene key="login" component={Login} hideNavBar={true}/>
                <Scene key="home" component={HomeContainer}  hideNavBar={true}/>
                <Scene key="package" component={PackageCreator} headerMode="float" hideNavBar={true}/>
                <Scene key="initPackage" component={initPackageCreator} hideNavBar={true}/> 
                <Scene key="review"  component={PackagePreview} hideNavBar={true}/>
                <Scene key="camer" component={CameraPage} initial={true} hideNavBar={true}/>
                <Scene key="cameraReview" component={CameraReview} back={true} title="Photo" />
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