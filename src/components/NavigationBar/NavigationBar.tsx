import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerMenu from './CustomDrawerMenu';
import { COLORS } from '../constants';
import News from '../../screen/NewsScreen/News';
import Weather from '../../screen/WeatherScreen/Weather';
import NewsDetails from '../../screen/NewsScreen/NewsDetails';
import Login from '../../screen/AuthScreen/Login';
import Register from '../../screen/AuthScreen/Register';

// Stack Navigator for News Details
const Stack = createStackNavigator();

function NewsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="News" component={News} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            {/* @ts-ignore */}
            <Stack.Screen name="NewsDetails" component={NewsDetails} />
        </Stack.Navigator>
    );
}

// Bottom Tabs for News & Weather
const Tab = createBottomTabNavigator();

function TopTabsGroup() {
    return (
        <Tab.Navigator
            initialRouteName="NewsStack"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    if (route.name === 'NewsStack') {
                        return <Entypo name="news" color={color} size={24} />;
                    } else if (route.name === 'Weather') {
                        return <MaterialCommunityIcons name="weather-night-partly-cloudy" color={color} size={24} />;
                    }
                    else if (route.name === 'Login') {
                        return <AntDesign name="login" color={color} size={24} />;
                    }
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.success2,
            })}
        >
            <Tab.Screen name="NewsStack" component={NewsStack} options={{ tabBarLabel: 'News', headerShown: false }} />
            <Tab.Screen name="Weather" component={Weather} options={{ tabBarLabel: 'Weather', headerShown: false }} />
            <Tab.Screen name="Login" component={Login} options={{ tabBarLabel: 'Weather', headerShown: false }} />
        </Tab.Navigator>
    );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

function DrawerGroup() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerMenu {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.success2 },
                headerShown: true,
            }}
        >
            <Drawer.Screen name="News & Weather" component={TopTabsGroup} />
            <Drawer.Screen name="News" component={News} />
            <Drawer.Screen name="Weather" component={Weather} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
    );
}

// Main Navigation
export default function NavigationBar() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={COLORS.success2} barStyle="light-content" />
            <DrawerGroup />
        </NavigationContainer>
    );
}
