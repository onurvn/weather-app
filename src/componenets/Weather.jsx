import { useState } from "react";
import axios from "axios"

const Weather = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3553006c2c6a75aadf1c600d8119c551`;

    const searchLocation = (e) => {
        if (e.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            setLocation("")
        }
    }

    return (
        <>
            <div className="h-[30rem] flex items-center justify-center flex-col">
                <div className="text-4xl text-center">
                    <div className="w-full mb-5">
                        <input type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            onKeyPress={searchLocation}
                            className=" text-gray-900 text-sm rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter City Name" />
                    </div>
                    <h1 className="text-3xl">{data.name}</h1>
                    <div className="font-bold my-5">
                        {data.weather ? <p>{data.main.temp.toFixed()}°C</p> : null}
                    </div>
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
                {data.name != undefined &&
                    <div className="bg-gray-600 rounded-lg p-6 flex gap-x-10 text-3xl mt-10">
                        <div className="flex flex-col items-center">
                            {data.main ? <p>{data.main.feels_like}°C</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="flex flex-col items-center">
                            {data.main ? <p>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="flex flex-col items-center">
                            {data.main ? <p>{data.wind.speed.toFixed()} KM</p> : null}
                            <p>Winds Speed</p>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Weather