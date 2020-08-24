# kpi.js (development)

This tool is part of a series of UI tools to facilitate the development of data interfaces for the browser with focus on:
- easy implementation
- mobile responsiveness
- aesthetic pleasing design
- speed

## Usage
### JavaScript
```javascript
const salesKPI = new KPI();
salesKPI.image = "sales.png";
salesKPI.type = "money";
salesKPI.load("data_file_4.json");
```
### JSON Data File Format
```javascript
{"0":{
    "title" : "Sales - July 15th",
    "value" : "931", 
    "target" : "900"
},
"1":{
    "title" : "July 14th",
    "value" : "827", 
    "target" : "800" 
},
"2":{
    "title" : "July 13th",
    "value" : "746", 
    "target" : "700" 
},
"3":{
    "title" : "July 12th",
    "value" : "649", 
    "target" : "600"
}}
```

## Sample:
![kpi.js](https://wrightanalytics.dev/kpi-js-sample.gif)

## Upcoming :soon:
- [ ] Add targets to UI
- [ ] Set up Wireframe obj, no loner KPIs
- [ ] Add range(), so you get the nice yellow warning
- [ ] Add refresh(), refresh data periodically
- [ ] Add refresh time to UI
