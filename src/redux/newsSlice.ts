import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiNewsKey } from '../components/constants/theme';

export interface NewsType {
    title: string;
    author: string;
    publishedAt: string;
    urlToImage: string;
    url: string;
}

interface NewsState {
    news: NewsType[];
    loading: boolean;
    error: string | null;
    page: number;
}

const initialState: NewsState = {
    news: [],
    loading: false,
    error: null,
    page: 1,
};

// Fetch news from API with pagination (15 items per page)
export const fetchNews = createAsyncThunk('news/fetchNews', async (page: number) => {
    const response = await fetch(
        `https://newsapi.org/v2/everything?q=tesla&from=2025-01-03&sortBy=publishedAt&apiKey=${apiNewsKey}&page=${page}&pageSize=15`,
    );
    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }
    const data = await response.json();
    return data.articles;
});

// Load cached news from AsyncStorage
export const loadCachedNews = createAsyncThunk('news/loadCachedNews', async () => {
    const cachedNews = await AsyncStorage.getItem('cachedNews');
    return cachedNews ? JSON.parse(cachedNews) : [];
});

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        resetNews: (state) => {
            state.news = [];
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.length > 0) {
                    state.news = [...state.news, ...action.payload];
                    state.page += 1;
                    AsyncStorage.setItem('cachedNews', JSON.stringify(state.news)); // Cache news
                }
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            })
            .addCase(loadCachedNews.fulfilled, (state, action) => {
                state.news = action.payload;
            });
    },
});

export const { resetNews } = newsSlice.actions;
export default newsSlice.reducer;
