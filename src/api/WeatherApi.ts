import axios from "axios";
import { apiKey } from "../components/constants/theme";
import { ForecastParams, Location, LocationParams, WeatherData } from "../Type";


const forecastEndpoint = (params: ForecastParams): string =>
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const locationEndpoint = (params: LocationParams): string =>
    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async <T>(endpoint: string): Promise<T | undefined> => {
    const options = {
        method: 'GET',
        url: endpoint,
    };
    try {
        const response = await axios.request<T>(options);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return undefined;
    }
};

const FetchWeatherForecast = (params: ForecastParams): Promise<WeatherData | undefined> => {
    return apiCall<WeatherData>(forecastEndpoint(params));
};

const FetchLocations = (params: LocationParams): Promise<Location[] | undefined> => {
    return apiCall<Location[]>(locationEndpoint(params));
};

export { FetchWeatherForecast, FetchLocations };