import React from 'react';
import { View } from 'react-native';
import { useIsLoggedIn } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';

export default () => {
    const isLoggedIn = false;
    return (
        <View style={{flex: 1}}>
          {isLoggedIn === true ? <MainNavigation /> : <AuthNavigation />}
        </View>
    );
};
