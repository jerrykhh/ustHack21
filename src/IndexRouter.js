import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Login from './view/Login';
import HomeContainer from './view/HomeContainer';
import PackageCreator from './view/PackageCreator';
import initPackageCreator from './view/initPackageCreator';

const IndexRouter = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar={true}>
                <Scene key="login" component={Login}/>
                <Scene key="home" component={HomeContainer}  />
                <Scene key="package" component={PackageCreator} headerMode="float" />
                <Scene key="initPackage" component={initPackageCreator} initial={true}/> 
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