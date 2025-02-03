import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { fetchNews, loadCachedNews, resetNews } from '../../redux/newsSlice';
import { RootState } from '../../redux/store';
import { NewsType } from '../../Type';
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../../components/constants';

const News = () => {
    const dispatch = useDispatch();
    const { news, loading, error, page } = useSelector((state: RootState) => state.news);
    const [hasMore, setHasMore] = React.useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(resetNews());
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                // @ts-ignore
                dispatch(fetchNews(1));
            } else {
                // @ts-ignore
                dispatch(loadCachedNews());
            }
        });
    }, [dispatch]);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            // @ts-ignore
            dispatch(fetchNews(page));
        }
    };

    const renderItem = ({ item }: { item: NewsType }) => (
        // @ts-ignore
        <TouchableOpacity onPress={() => navigation.navigate('NewsDetails', { item })}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                borderWidth: 5,
                borderColor: COLORS.slate[200],
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 15,
                padding: 10,
            }}>
                {item.urlToImage && (
                    <Image
                        style={{ height: 90, width: 90, borderRadius: 30 }}
                        source={{ uri: item.urlToImage }}
                        resizeMode="cover"
                    />
                )}
                <View style={{ flex: 1 }}>
                    {item.author && (
                        <Text style={{ color: COLORS.slate[500], letterSpacing: 3, fontSize: 12, fontWeight: '300' }}>
                            {item.author}
                        </Text>
                    )}
                    <Text style={{ color: COLORS.slate[900], fontSize: 20, fontWeight: 'bold' }}>
                        {item.title?.slice(0, 100)}
                    </Text>
                    {item.publishedAt && (
                        <Text style={{ color: COLORS.slate[500], marginTop: 5, letterSpacing: 2, fontSize: 12, fontWeight: '300' }}>
                            {new Date(item.publishedAt).toLocaleDateString()}
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" color={COLORS.slate[900]} />
            </View>
        );
    };

    return (
        <FlatList
            // @ts-ignore
            data={news}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.url || index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
    );
};

export default News;
