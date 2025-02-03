import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NewsType } from '../../redux/newsSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../../components/constants';

// @ts-ignore
const NewsDetails: React.FC<NewsType> = ({ route }) => {
    const { item } = route?.params;
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* @ts-ignore */}
                <TouchableOpacity onPress={() => navigation.navigate('News')}>
                    <View style={{ height: 40, width: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginTop: 10, backgroundColor: 'black', borderRadius: 10 }}>
                        <Entypo name="arrow-bold-left" color="red" size={40} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ padding: 10, }}>
                <Image
                    style={{
                        width: '100%',
                        height: 250,
                        resizeMode: 'cover',
                        borderRadius: 10,
                        marginBottom: 20,
                        marginTop: 20,
                    }}
                    source={{ uri: item?.urlToImage }}
                />
                <View style={{ flexDirection: 'row', alignContent: 'space-between', marginStart: 15, gap: 50 }}>
                    <Text style={{ color: COLORS.slate[500], letterSpacing: 0, fontSize: 15, fontWeight: '300' }}>
                        {item.author}
                    </Text>
                    <Text style={{ color: COLORS.slate[500], marginTop: 5, letterSpacing: 2, fontSize: 12, fontWeight: '300' }}>
                        {new Date(item.publishedAt).toLocaleDateString()} </Text>
                </View>
                <Text style={{ marginTop: 10, fontSize: 22, color: COLORS.black, fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{item.title}</Text>
                <Text style={{ marginTop: 10, fontSize: 18, color: COLORS.black, textAlign: 'left', padding: 5 }}>{item.description}</Text>
                <Text style={{ marginTop: 10, fontSize: 18, color: COLORS.black, textAlign: 'left', padding: 5 }}>{item.content}</Text>
            </View>
        </ScrollView>
    );
};

export default NewsDetails;
