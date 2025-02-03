import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { Linking, Share, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../constants';

export default function CustomDrawerMenu(props: any) {
    const handleDrawerItemClick = () => {
        props.navigation.closeDrawer();
    };

    const packageName = 'com.samimhossain.ramadancalendar';
    const playStoreLink = `https://play.google.com/store/apps/details?id=${packageName}`;

    const openPlayStoreRating = () => {
        Linking.openURL(`market://details?id=${packageName}`).catch(err =>
            console.error('Error opening Play Store:', err)
        );
    };

    const moreApps = () => {
        Linking.openURL('https://play.google.com/store/apps/developer?id=MY+RIGIL+SOFT').catch(err =>
            console.error('Error opening Play Store:', err)
        );
    };

    const shareApp = async () => {
        try {
            await Share.share({
                message: `Check out this awesome app: ${playStoreLink}`,
            });
        } catch (error) {
            console.error('Error sharing app:', error);
        }
    };

    const checkForUpdate = () => {
        Linking.openURL(playStoreLink).catch(err =>
            console.error('Error checking for updates:', err)
        );
    };

    const contactUs = () => {
        Linking.openURL('https://www.facebook.com/alljobsbdTeletalks').catch(err =>
            console.error('Error opening Facebook page:', err)
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 8,
                            marginBottom: 10,
                            padding: 10,
                        }}
                        onPress={handleDrawerItemClick}>
                        <AntDesign name="arrowleft" color={COLORS.success2} size={30} />
                        <Text style={{ marginLeft: 10, color: COLORS.success2, fontWeight: 'bold' }}>
                            Close Menu
                        </Text>
                    </TouchableOpacity>
                </View>


                <DrawerItem
                    icon={() => <Entypo name="news" color={COLORS.success2} size={30} />}
                    label="News"
                    onPress={() => props.navigation.navigate('News')}
                    labelStyle={{ color: COLORS.success2 }}
                />

                <DrawerItem
                    icon={() => <MaterialCommunityIcons name="weather-night-partly-cloudy" color={COLORS.success2} size={30} />}
                    label="Weather"
                    onPress={() => props.navigation.navigate('Weather')}
                    labelStyle={{ color: COLORS.success2 }}
                />

                <Text style={{
                    textAlign: 'center',
                    fontSize: 17,
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                    marginLeft: 25,
                    marginTop: 25,
                    color: COLORS.success2,
                }}>
                    Help Center
                </Text>

                <DrawerItem
                    icon={() => <AntDesign name="android1" color={COLORS.success2} size={30} />}
                    label="More Apps"
                    onPress={moreApps}
                    labelStyle={{ color: COLORS.success2, fontWeight: 'bold' }}
                />

                <DrawerItem
                    icon={() => <MaterialIcons name="security-update" color={COLORS.success2} size={30} />}
                    label="Check For Update"
                    onPress={checkForUpdate}
                    labelStyle={{ color: COLORS.success2, fontWeight: 'bold' }}
                />

                <DrawerItem
                    icon={() => <AntDesign name="contacts" color={COLORS.success2} size={30} />}
                    label="Contact Us"
                    onPress={contactUs}
                    labelStyle={{ color: COLORS.success2, fontWeight: 'bold' }}
                />

                <DrawerItem
                    icon={() => <AntDesign name="sharealt" color={COLORS.success2} size={30} />}
                    label="অ্যাপ শেয়ার করুন"
                    onPress={shareApp}
                    labelStyle={{ color: COLORS.success2, fontWeight: 'bold' }}
                />

                <DrawerItem
                    icon={() => <AntDesign name="star" color={COLORS.success2} size={30} />}
                    label="5 স্টার দিন"
                    onPress={openPlayStoreRating}
                    labelStyle={{ color: COLORS.success2, fontWeight: 'bold' }}
                />
            </DrawerContentScrollView>
        </View>
    );
}
