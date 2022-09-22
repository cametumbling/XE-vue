<template>
  <div class="flex flex-col flex-1 items-center" v-if="weatherData">
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>
        Feels like
        {{ Math.round(weatherData.current.feels_like) }} &deg;
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 text-2xl">Next hours</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
            <p class="text-xl">{{ Math.floor(hourData.pop * 100) }}%</p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 text-2xl">Next Days</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex justify-between mb-2"
        >
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div>
            <h2 class="text-xl">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-us", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })
              }}
            </h2>
            <p>
              {{ day.weather[0].description }}
            </p>
          </div>
          <div class="flex gap-2">
            <p>{{ Math.round(day.temp.max) }}°</p>
            <p>{{ Math.round(day.temp.min) }}°</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="text-sm text-white mb-12">
        Last updated on
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            day: "2-digit",
            month: "short",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router"; //useRouter
const openweathermapAPIKey = import.meta.env.VITE_OPENWEATHERMAP;
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openweathermapAPIKey}&units=metric`
    ); //exclude=hourly,daily&
    console.log(weatherData.data);

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
</script>
