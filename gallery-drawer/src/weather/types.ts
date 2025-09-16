export type Conditions = {
  text: string;
  icon: string; // url
};

export type CurrentWeather = {
  locationName: string;
  region: string;
  country: string;
  tempF: number;
  feelsLikeF: number;
  condition: Conditions;
};

export type DailyForecast = {
  date: string;
  minF: number;
  maxF: number;
  text: string;
  icon: string;
};

export type ForecastResponse = {
  current: CurrentWeather;
  days: DailyForecast[];
};
