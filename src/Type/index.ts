export interface Location {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

export interface CurrentWeather {
    temp_c: number;
    icon: string;
    condition: {
        text: string;
        icon: string;
    };
    wind_kph: number;
    humidity: number;
    sunrise: string;
}

export interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: CurrentWeather;
    forecast: {
        forecastday: Array<{
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                condition: {
                    text: string;
                    icon: string;
                };
            };
        }>;
    };
}



export interface ForecastParams {
    cityName: string;
    days: string;
}

export interface LocationParams {
    cityName: string;
}


