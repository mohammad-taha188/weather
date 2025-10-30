import Search from "@/components/search";
import Image from "next/image";

export default async function Home({ searchParams }) {
  let search = await searchParams;

  console.log(search.s);

  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.s}&appid=1308934394f18a7ac84141670b5663f7`
  ).then((res) => res.json());

  const weatherModel = {
    Thunderstorm: "/icon/animated/thunder.svg",
    Rain: "/icon/animated/rainy-6.svg",
    Snow: "/icon/animated/snowy-6.svg",
    Drizzle: "/icon/animated/rainy-4.svg",
    Mist: "/icon/fog.svg",
    Haze: "/icon/fog.svg",
    Fog: "/icon/fog.svg",
    Dust: "/icon/dust.svg",
    Ash: "/icon/dust.svg",
    Sand: "/icon/dust.svg",
    Clouds: "/icon/animated/cloudy-day-2.svg",
    Clear: "/icon/animated/day.svg",
    Squall: "/icon/wind.svg",
    Tornado: "/icon/animated/tornado.svg",
  };
  const localTime = new Date((data.dt + data.timezone) * 1000);

  const hours = String(localTime.getUTCHours()).padStart(2, "0");
  const minutes = String(localTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(localTime.getUTCSeconds()).padStart(2, "0");

  const cityTime = `${hours}:${minutes}`;

  return (
    <div className="">
      <div className="flex justify-center items-center h-dvh">
        <div className="bg-white w-[80%] h-[80%] rounded-sm p-4">
          <h1 className="text-gray-600 text-center mx-3">Weather</h1>
          <Search />
          <div className="flex justify-center items-center">
            {search.s ? (
              <div className="my-2 text-gray-700 text-center ">
                {data?.cod != 200 ? (
                  <div className="">
                    <h2>{data?.message}</h2>
                    <div className="">
                      <Image
                        src={"/icon/animated/cloudy-day-1.svg"}
                        width={200}
                        height={200}
                        alt="'weather"
                      ></Image>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <h2>
                      {search.s} || {data?.sys.country}
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border border-gray-200 bg-sky-50 rounded-sm p-4 shadow shadow-gray-300 flex flex-col justify-between">
                        <div className="flex items-center justify-center">
                          <p>main : {(data?.main.temp - 272.15).toFixed(2)}C</p>
                          <Image
                            src={"/icon/temp.svg"}
                            width={30}
                            height={30}
                            alt="'temp"
                          ></Image>
                        </div>
                        <div className="h-px w-full bg-gray-700"></div>
                        <div className="flex items-center justify-center">
                          <p>wind : {(data?.wind.speed).toFixed(2)}</p>
                          <Image
                            src={"/icon/wind.svg"}
                            width={30}
                            height={30}
                            alt="'temp"
                          ></Image>
                        </div>
                      </div>
                      <div className="border border-gray-200 bg-sky-50 rounded-sm p-4 shadow shadow-gray-300">
                        <div className="flex items-center justify-center flex-col">
                          <p>{data?.weather[0].main}</p>
                          <Image
                            src={
                              weatherModel[data?.weather[0]?.main] ||
                              "/icon/animated/cloudy-day-1.svg"
                            }
                            width={70}
                            height={70}
                            alt="'temp"
                          ></Image>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="border border-gray-200 bg-sky-50 rounded-sm p-4 shadow shadow-gray-300">
                        <div className="flex items-center justify-center flex-col">
                          <p>Pressure : {data?.main?.pressure} hPa</p>
                          <div className="h-px w-full bg-gray-700"></div>

                          <p>Humidity : {data?.main?.humidity}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border border-gray-200 bg-sky-50 rounded-sm p-2 shadow shadow-gray-300 flex justify-center items-center flex-col">
                        <p>{cityTime}</p>
                      </div>
                      <div className="border border-gray-200 bg-sky-50 rounded-sm p-2 shadow shadow-gray-300 flex justify-center items-center flex-col">
                        {hours >= 6 && hours <= 18 ? (
                          <Image
                            src={"/icon/animated/day.svg"}
                            width={90}
                            height={90}
                            alt="'weather"
                          ></Image>
                        ) : (
                          <Image
                            src={"/icon/animated/night.svg"}
                            width={90}
                            height={90}
                            alt="'weather"
                          ></Image>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Image
                src={"/icon/animated/cloudy-day-1.svg"}
                width={200}
                height={200}
                alt="'weather"
              ></Image>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
