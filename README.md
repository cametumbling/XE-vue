# XE-vue

A project in two parts:
- Tabbed browsing of 3 cities
- City weather search

## Notes
This project served as my introduction to both Vue (I have primarily used React) and Tailwind. I first built a simple weather search app, __SearchView__ routing to __CityView__ using the __AsyncCityView__ component in a more "reacty" function structure that also corrects for timezone offset. Then I backtracked to implement the 3 tabs of the requirement doc __TabsView__ using the __CityTabs__ component. I converted this to be more in the spirit of Vue3, but wound up playing around with various approaches to dynamic tabbing (unused components include _CityTabs2_, _TabNav_, _TabTabTab_ and certain portions of __CityTabs__) before running short on time, sprucing up the styling and submitting.

## Next Steps
- Dynamically add selected prop to tabs, load inital data
- Refactor completely, code is drenched and not remotely DRY
- Add timezone offset to tabbed view and initial data load

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
