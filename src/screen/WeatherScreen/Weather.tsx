import React from 'react';
import { View, Text, StatusBar, Image, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../components/constants';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';


const Weather = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Image
                style={styles.backgroundImage}
                blurRadius={70}
                source={require("../../components/assets/images/bg.png")}
            />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <TextInput
                            placeholder='Search City'
                            placeholderTextColor={COLORS.primary}
                            style={styles.searchInput}
                        />
                        <TouchableOpacity style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>icon</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    safeArea: {
        flex: 1,
    },
    searchContainer: {
        height: '10%',
        position: 'relative',
        zIndex: 50,
        marginTop: 40,
        padding: 5
    },
    searchBar: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 90,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.primary,
        paddingLeft: 10,
    },
    searchButton: {
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 10,
    },
    searchButtonText: {
        color: COLORS.primary,
    },
});

export default Weather;