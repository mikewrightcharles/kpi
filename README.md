# kpi.js (development)

This tool is part of a series of UI tools to facilitate the development of data interfaces for the browser with focus on:
- easy implementation
- mobile responsiveness
- aesthetic pleasing design
- speed

## Usage
```javascript
const salesKPI = new KPI();
salesKPI.image = "sales.png";
salesKPI.type = "money";
salesKPI.load("data_file_4.json");
```

## Sample:
![kpi.js](https://wrightanalytics.dev/kpi-js-sample.gif)

## Upcoming :soon:
- [ ] Add targets to UI
- [ ] Set up Wireframe obj, no loner KPIs
- [ ] Add range(), so you get the nice yellow warning
- [ ] Add refresh(), refresh data periodically
- [ ] Add refresh time to UI