interface Location {
  lat: string;
  lon: string;
}

interface Forecast {
  city: City;
  list: Array<ForecastItem>;
}

export interface City {
  name: string;
}

export interface ForecastItem {
  dt_txt: string;
  weather: Array<{ main: string; }>
}

export const client = () => {
  const apiURL = 'https://api.openweathermap.org';
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  const getLocationFromZipcode = async (zipcode: string): Promise<Location> => {
    const location = await fetch(`${apiURL}/geo/1.0/zip?zip=${zipcode},US&limit=1&appid=${apiKey}`);
    return location.json();
  }

  const getForecastFromLocation = async (lat: string, lon: string): Promise<Forecast> => {
    const forecast = await fetch(`${apiURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return forecast.json();
  }

  return {
    getLocationFromZipcode,
    getForecastFromLocation
  }
}