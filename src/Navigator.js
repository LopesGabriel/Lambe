import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createSwitchNavigator } from '@react-navigation/compat'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'

const Tab = createBottomTabNavigator();

const loginOrProfileRouter = createSwitchNavigator({
    Profile:  Profile,
    Auth: Login
},{
    initialRouteName: 'Profile'
})

export default function Navigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{ showLabel: false }} initialRouteName="Feed">
                <Tab.Screen
                    name="Feed" component={Feed} options={{ title: 'Feed', tabBarBadge: 2, tabBarIcon: ({ color }) =>
                    <Icon name='home' size={30} color={color} /> }} />
                <Tab.Screen
                    name="AddPhoto" component={AddPhoto} 
                    options={{ title: 'Add Picture', tabBarIcon: ({ color }) =>
                        <Icon name='camera' size={30} color={color} /> }} />
                <Tab.Screen
                    name="Profile" component={loginOrProfileRouter} 
                    options={{ title: 'Profile', tabBarIcon: ({ color }) =>
                        <Icon name='user' size={30} color={color} /> }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}