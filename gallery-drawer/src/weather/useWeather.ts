import { useCallback, useEffect, useState } from 'react';
import { ForecastResponse } from './types';

type Args = { q: string; days: number };

const API_KEY = 'c8a27aa72a454d06bc7234721251509';

export function useWeather({ q, days }: Args) {
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url =
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}` +
        `&q=${encodeURIComponent(q)}&days=${days}&aqi=no&alerts=no`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');

      const json = await res.json();

      const current = {
        locationName: json.location.name as string,
        region: json.location.region as string,
        country: json.location.country as string,
        tempF: json.current.temp_f as number,
        feelsLikeF: json.current.feelslike_f as number,
        condition: {
          text: json.current.condition.text as string,
          icon: 'https:' + json.current.condition.icon,
        },
      };

      const daysList = (json.forecast?.forecastday ?? []).map((d: any) => ({
        date: d.date as string,
        minF: d.day.mintemp_f as number,
        maxF: d.day.maxtemp_f as number,
        text: d.day.condition.text as string,
        icon: 'https:' + d.day.condition.icon,
      }));

      const shaped: ForecastResponse = { current, days: daysList };
      setData(shaped);
    } catch (e: any) {
      setError(e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [q, days]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
