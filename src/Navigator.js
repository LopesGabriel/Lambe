import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'

const Tab = createBottomTabNavigator();

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
                    name="Profile" component={Feed} 
                    options={{ title: 'Profile', tabBarIcon: ({ color }) =>
                        <Icon name='user' size={30} color={color} /> }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}