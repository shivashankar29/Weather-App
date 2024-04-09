import {DateTime} from "luxon";
const apiKey = '000c784582023d0035e48b44adac122a';
const baseUrl = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType,searchParams) => {
    const url = new URL(baseUrl + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:apiKey});

    return fetch(url)
      .then((res) => res.json())
}



const formatCurrentWeather = (data) => {
    const {
        coord:{lat,lon},
        main:{temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country, sunrise, sunset},
        weather,
        wind:{speed}
    } = data
    const {main: details, icon} = weather[0]
    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,details,icon,speed}

}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather',searchParams).then(formatCurrentWeather)
    const {lat,lon} = formattedCurrentWeather;
    
    const formattedForecastWeather = await getWeatherData("onecall",{
        lat,lon,exclude:"current,minutely,alerts",
        units:searchParams.units
        
    }).then() 
    return {...formattedCurrentWeather,...formattedForecastWeather} 
}
const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' "
  ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export {formatToLocalTime,iconUrlFromCode} 
