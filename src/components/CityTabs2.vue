<template>
  <main>
    <template>
      <div>
        <TabNav
          :tabs="['Rio de Janeiro', 'Beijing', 'Los Angeles']"
          :selected="selected"
          @selected="setSelected"
        >
          <TabTabTab
            :isSelected="selected === 'Rio de Janeiro'"
            @click="getCityWeather(-22.911, -43.2094)"
          >
            <p>Rio de Janeiro</p>
          </TabTabTab>
          <TabTabTab :isSelected="selected === 'Beijing'">
            <p>Beijing</p>
          </TabTabTab>
          <TabTabTab :isSelected="selected === 'Los Angeles'">
            <p>Los Angeles</p>
          </TabTabTab>
        </TabNav>
      </div>
    </template>
    <template v-if="weatherData">
      <div class="flex flex-col flex-1 items-center">
        <div class="flex flex-col items-center text-white py-12">
          <!-- <h1 class="text-4xl mb-2">{{ route.params.city }}</h1> -->
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
            <h2 class="mb-4">Next hours</h2>
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
                    new Date(hourData.dt * 1000).toLocaleTimeString("en-us", {
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
            <h2 class="mb-4">Next Days</h2>
            <div
              v-for="day in weatherData.daily"
              :key="day.dt"
              class="flex items-center mb-2"
            >
              <img
                class="w-[50px] h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                alt=""
              />
              <div>
                <h2>
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
              <div class="flex gap-2 flex-1 justify-end">
                <p>{{ Math.round(day.temp.max) }}°</p>
                <p>{{ Math.round(day.temp.min) }}°</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="text-sm mb-12">
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
          </p>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import axios from "axios";
import TabNav from "./TabNav.vue";
import TabTabTab from "./TabTabTab.vue";
const openweathermapAPIKey = import.meta.env.VITE_OPENWEATHERMAP;

export default {
  components: { TabNav, TabTabTab },
  data() {
    return {
      weatherData: null,
      selected: "Rio de Janeiro",
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
    setSelected(tab) {
      this.selected = tab;
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
