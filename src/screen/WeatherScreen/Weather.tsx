import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Image, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS } from '../../components/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { FetchLocations, FetchWeatherForecast } from '../../api/WeatherApi';
import { Location, WeatherData } from '../../Type';
import { getData, storeData } from '../../utils/AsyncStorage';

const Weather = () => {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchDefaultWeatherData();
    }, []);

    const handleLocation = (loc: Location) => {
        setLocations([]);
        toggleSearch(false);
        setLoading(true); // Set loading to true when fetching new location data
        FetchWeatherForecast({
            cityName: loc.name,
            days: '7',
        })
            // @ts-ignore
            .then((data: WeatherData) => {
                setWeather(data);
                setLoading(false);
                storeData("city", loc.name);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            });
    };

    const fetchDefaultWeatherData = async () => {
        let myCity = await getData("city");
        let cityName = "bangladesh"

        if (myCity) cityName = myCity



        FetchWeatherForecast({
            cityName: 'bangladesh',
            days: '7',
        })
            // @ts-ignore
            .then((data: WeatherData) => {
                setWeather(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            });
    };



    const handleSearch = (value: string) => {
        if (value.length > 2) {
            FetchLocations({ cityName: value })
                // @ts-ignore
                .then((data: Location[]) => {
                    setLocations(data);
                })
                .catch((error) => {
                    console.error("Error fetching locations:", error);
                });
        } else {
            setLocations([]);
        }
    };

    const { location, current } = weather || {};

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Image
                style={styles.backgroundImage}
                blurRadius={70}
                source={require("../../components/assets/images/bg3.jpg")}
            />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <SafeAreaView style={styles.safeArea}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={[styles.searchBar, { backgroundColor: showSearch ? COLORS.white : 'transparent' }]}>
                            {showSearch && (
                                <TextInput
                                    onChangeText={handleSearch}
                                    placeholder="Search City"
                                    placeholderTextColor={COLORS.primary}
                                    style={styles.searchInput}
                                />
                            )}
                            <TouchableOpacity
                                onPress={() => toggleSearch(!showSearch)}
                                style={styles.searchButton}
                            >
                                <FontAwesome name="search" color={showSearch ? COLORS.primary : COLORS.background} size={27} />
                            </TouchableOpacity>
                        </View>

                        {/* Location List */}
                        {locations.length > 0 && showSearch && (
                            <View style={styles.locationList}>
                                {locations.map((loc, index) => {
                                    const showBorder = index + 1 !== locations.length;
                                    return (
                                        <TouchableOpacity
                                            onPress={() => handleLocation(loc)}
                                            key={loc.id}
                                            style={[
                                                styles.locationItem,
                                                showBorder && styles.locationItemBorder,
                                            ]}
                                        >
                                            <FontAwesome name="map-marker" color={COLORS.primary} size={27} />
                                            <Text style={styles.locationText}>{loc.name}, {loc.country}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </View>

                    {/* Location Section */}
                    {location && (
                        <View style={styles.locationSection}>
                            <Text style={styles.locationTextMain}>
                                {location.name}
                                <Text style={styles.locationTextSub}>
                                    {`, ${location.region}, ${location.country}`}
                                </Text>
                            </Text>
                        </View>
                    )}

                    {/* Weather Image */}
                    <View style={styles.weatherImageContainer}>
                        <Image
                            source={{ uri: `https:${current?.condition?.icon}` }}
                            style={styles.weatherImage}
                        />
                    </View>
                    {current && (
                        <View style={styles.temperatureContainer}>
                            <Text style={styles.temperatureText}>{current.temp_c}&#176;</Text>
                            <Text style={styles.weatherConditionText}>{current.condition.text}</Text>
                        </View>
                    )}

                    {/* Weather Stats */}
                    {current && (
                        <View style={styles.weatherStatsContainer}>
                            <View style={styles.statItem}>
                                <Image style={styles.statIcon} source={require("../../components/assets/icons/wind.png")} />
                                <Text style={styles.statText}>{current.wind_kph} km/h</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Image style={styles.statIcon} source={require("../../components/assets/icons/drop.png")} />
                                <Text style={styles.statText}>{current.humidity}%</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Image style={styles.statIcon} source={require("../../components/assets/icons/sun.png")} />
                                <Text style={styles.statText}>{current.sunrise} 6:05</Text>
                            </View>
                        </View>
                    )}

                    {/* Daily Forecast */}
                    {weather?.forecast && (
                        <View style={styles.forecastContainer}>
                            <View style={styles.forecastHeader}>
                                <AntDesignIcon name="calendar" color={COLORS.white} size={27} />
                                <Text style={styles.forecastHeaderText}>Daily Forecast</Text>
                            </View>
                            <ScrollView
                                horizontal
                                contentContainerStyle={styles.forecastScrollView}
                                showsHorizontalScrollIndicator={false}
                            >
                                {weather.forecast.forecastday.map((day, index) => {
                                    const date = new Date(day.date);
                                    const options = { weekday: 'long' };
                                    // @ts-ignore
                                    const dayName = date.toLocaleDateString('en-US', options).split(',')[0];

                                    return (
                                        <View key={index} style={styles.forecastItem}>
                                            <Image
                                                style={styles.forecastImage}
                                                source={{ uri: `https:${day.day.condition.icon}` }}
                                            />
                                            <Text style={styles.forecastDay}>{dayName}</Text>
                                            <Text style={styles.forecastTemperature}>{day.day.maxtemp_c}&#176;</Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    )}
                </SafeAreaView>
            )}
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
        marginTop: 5,
        padding: 5,
    },
    searchBar: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 90,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.primary,
        paddingLeft: 10,
    },
    searchButton: {
        borderRadius: 50,
        padding: 10,
    },
    locationList: {
        position: 'absolute',
        width: '100%',
        backgroundColor: COLORS.white,
        marginTop: 75,
        borderRadius: 15,
        padding: 10,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    locationItemBorder: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.background,
    },
    locationText: {
        marginLeft: 10,
        color: COLORS.black,
        fontSize: 18,
    },
    locationSection: {
        flex: 1,
        justifyContent: 'space-around',
    },
    locationTextMain: {
        color: COLORS.white,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    locationTextSub: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.slate[400],
    },
    weatherImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    weatherImage: {
        width: 200,
        height: 200,
    },
    temperatureContainer: {
        rowGap: 20,
    },
    temperatureText: {
        color: COLORS.white,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    weatherConditionText: {
        color: COLORS.white,
        fontSize: 20,
        textAlign: 'center',
        letterSpacing: 3,
    },
    weatherStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 25,
        marginTop: 20,
    },
    statItem: {
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
    },
    statIcon: {
        height: 25,
        width: 25,
    },
    statText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '700',
    },
    forecastContainer: {
        marginBottom: 50,
        rowGap: 5,
        padding: 10,
    },
    forecastHeader: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    forecastHeaderText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
    },
    forecastScrollView: {
        paddingHorizontal: 15,
    },
    forecastItem: {
        width: 90,
        backgroundColor: COLORS.gray[500],
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
        borderRadius: 15,
        rowGap: 6,
        marginRight: 15,
    },
    forecastImage: {
        height: 70,
        width: 70,
    },
    forecastDay: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '400',
    },
    forecastTemperature: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Weather;