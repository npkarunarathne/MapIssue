// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="MapScreen">
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Map View' }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Detail View' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
