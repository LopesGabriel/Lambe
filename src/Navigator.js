import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createSwitchNavigator } from '@react-navigation/compat'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const authRouter = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

const loginOrProfileRouter = createSwitchNavigator({
    Profile:  Profile,
    Auth: authRouter
},{
    initialRouteName: 'Auth'
})

class Navigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{ showLabel: false }} initialRouteName="Feed">
                    <Tab.Screen
                        name="Feed" component={Feed} options={{ title: 'Feed', tabBarBadge: this.props.posts.length, tabBarIcon: ({ color }) =>
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
}

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts
    }
}

export default connect(mapStateToProps)(Navigator)