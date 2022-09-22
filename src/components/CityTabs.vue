<template>
  <main>
    <template v-if="weatherData">
      <div class="flex place-content-center space-x-10 bg-white py-4">
        <!-- <ul>
          <li
            v-for="city in cities"
            @click="
              toggleIsActive(city);
              getCityWeather(city.lat, city.lon);
            "
            :key="city.name"
            :class="{ activeClass: city.isActive }"
          >
            {{ city.name }}
          </li>
        </ul> -->
        <button
          class="cursor-pointer text-transform: uppercase"
          @click="getCityWeather(-22.911, -43.2094)"
          :class="[isActive ? activeClass : '']"
        >
          Rio de Janeiro
        </button>
        <button
          class="cursor-pointer text-transform: uppercase"
          @click="getCityWeather(39.905, 116.39139)"
          :class="isActive ? activeClass : ''"
        >
          Beijing
        </button>
        <button
          class="cursor-pointer text-transform: uppercase"
          @click="getCityWeather(34.053691, -118.242766)"
          :class="isActive ? activeClass : ''"
        >
          Los Angeles
        </button>
      </div>
      <div class="flex flex-col flex-1 items-center bg-weather-primary">
        <!-- Hourly Weather -->
        <div class="max-w-screen-md w-full py-4 bg-weather-secondary">
          <div class="p-10 bg-white mx-4">
            <h2 class="mb-4 text-2xl">Next hours</h2>
            <div class="flex gap-10 overflow-x-scroll">
              <div
                v-for="hourData in weatherData.hourly"
                :key="hourData.dt"
                class="flex flex-col gap-4 items-center"
              >
                <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
                <p class="text-xl text-weather-precip">
                  {{ Math.floor(hourData.pop * 100) }}%
                </p>
                <img
                  class="w-auto h-[50px] object-cover"
                  :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                  alt=""
                />
                <p class="whitespace-nowrap text-md text-gray-600/75">
                  {{
                    new Date(hourData.dt * 1000).toLocaleTimeString("en-us", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Weekly Weather -->
        <div class="max-w-screen-md w-full py-4 bg-weather-tertiary">
          <div class="mx-4 bg-white p-10">
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
              <div class="flex flex-col items-center">
                <h2 class="text-xl">
                  {{
                    new Date(day.dt * 1000).toLocaleDateString("en-us", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    })
                  }}
                </h2>
                <p class="text-gray-600/75">
                  {{ day.weather[0].description }}
                </p>
              </div>
              <div class="flex gap-2 text-lg">
                <p>{{ Math.round(day.temp.max) }}°</p>
                <p>{{ Math.round(day.temp.min) }}°</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-weather-primary w-full flex place-content-end">
          <span class="text-sm mb-2 text-white">
            Last updated on
            {{
              new Date(weatherData.current.dt * 1000).toLocaleDateString(
                "en-us",
                {
                  day: "2-digit",
                  month: "short",
                }
              )
            }}
            {{
              new Date(weatherData.current.dt * 1000).toLocaleTimeString(
                "en-us",
                {
                  timeStyle: "short",
                }
              )
            }}
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex place-content-center space-x-10 text-white py-12">
        <button
          class="cursor-pointer"
          @click="getCityWeather(-22.911, -43.2094)"
        >
          Rio de Janeiro
        </button>
        <button
          class="py-2 cursor-pointer"
          @click="getCityWeather(39.905, 116.39139)"
        >
          Beijing
        </button>
        <button
          class="py-2 cursor-pointer"
          @click="getCityWeather(34.053691, -118.242766)"
        >
          Los Angeles
        </button>
      </div>
    </template>
  </main>
</template>

<script>
import axios from "axios";
const openweathermapAPIKey = import.meta.env.VITE_OPENWEATHERMAP;

export default {
  data() {
    return {
      weatherData: null,
      // isActive: true,
      cities: [
        { name: "Rio de Janeiro", isActive: true, lat: -22.911, lon: -43.2094 },
        { name: "Beijing", isActive: false, lat: 39.905, lon: 116.39139 },
        { name: "Los Angeles", isActive: false, lat: 34.0537, lon: -118.2428 },
      ],
    };
  },
  methods: {
    toggleIsActive(city) {
      city.isActive = !city.isActive;
    },
    getCityWeather(lat = -22.911, lon = -43.2094) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${openweathermapAPIKey}&units=metric`
        )
        .then((response) => (this.weatherData = response.data));
      console.log(this.weatherData);
    },
  },
};
</script>
<style scoped>
.activeClass {
  border-bottom: 2px solid red;
  color: black;
}
</style>
