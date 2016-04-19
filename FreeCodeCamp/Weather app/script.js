// uses //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

$(function(){

var iconLookup = { '01d': 'wi-day-sunny',	'01n': 'wi-night-clear', 	'02d': 'wi-day-cloudy',	'02n': 'wi-night-cloudy',	'03d': 'wi-cloud',	'03n': 'wi-cloud',	'04d': 'wi-cloudy',	'09d': 'wi-showers',	'09n': 'wi-showers',	'10d': 'wi-rain',
	'10n': 'wi-rain',	'11d': 'wi-thunderstorm',	'11n': 'wi-thunderstorm',	'13d': 'wi-day-snow',
	'13n': 'wi-night-snow',	'50d': 'wi-fog',	'50n': 'wi-fog' };

var settings = { location:'', cloud:'', icon:'', wDir:'', wSpeed:'', temp:'', units:'', background: '' };

fetchWeather();

  /* switch click listener */
$('.switch').click(function(e){
  flipTemp();
});

/* Flip temp between C and F */
function flipTemp(){

  var newUnits = swaps();
  settings.temp = tempUnitConv(settings.units, newUnits, settings.temp);
  settings.units  = newUnits;
  setData();
}

function degToCompass(num){
    var val = ((num/22.5) + 0.5);
    var dirs = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    val = Math.round((val % 16));
    return dirs[val];
}

/* gives alternate temp unit C => F*/
function swaps(){
    return settings.units === 'C' ? 'F' : 'C';
}

/* return background url based on temp */
function backUrl(temp) {
  if (temp < 273) { bg ='froze'; }
  else if (temp < 283) { bg = 'cold'; }
  else if (temp < 293) { bg = 'temperate'; }
  else if (temp < 303) { bg = 'hot'; }
  else { bg = 'roasting'; }
  return bg;
}

/* alter data in app window */
function setData() {
  $('.temp').text(settings.temp + 'º' + settings.units);
  $('.switch').text('º' + swaps());
  $('.cloud').text(settings.cloud);
  $('.wind').text('Wind : ' + degToCompass(settings.wDir) + ' at ' + settings.wSpeed + 'mps');
  $('.loc').text(settings.location);
  $('.icon i').addClass(iconLookup[settings.icon]);
  $('body').addClass(settings.background);
}

/* call location api and return city and country code */
function getLoc() {
  return $.getJSON('http://ip-api.com/json');
}

/* call weather api and return weather details obj */
function fetchWeather(){
  getLoc().done(function(data){
    settings.location = data.city + ',' + data.countryCode;
    $.getJSON('http://api.openweathermap.org/data/2.5/weather'
            , {
              q:settings.location,
              APPID: 'eeeda5cd4ae6244ac3d5de209be6516c'
              }
            , function(json) {
      // json traversal helpers.
      var weather = json.weather[0]
      var main = json.main;
      var wind = json.wind;
      // update settings.
      settings.cloud = weather.description;
      settings.icon = weather.icon;
      settings.temp = tempUnitConv('K', 'C', main.temp);
      settings.wSpeed = wind.speed;
      settings.wDir = wind.deg;
      settings.units = 'C';
      settings.background = backUrl(main.temp);
      // update window with new data.
      setData();
    });
  })
}

/*
* converts temps between Kelvin - Farenheit - Celcius
* example call tempUnitConv('K','F',0) => -459.66999999999996
*/
function tempUnitConv(unitFrom, unitTo, units){

  if(unitFrom === 'K'){ // from Kelvin to C or F
    return Math.round(unitTo === 'C' ? kToC(units) : cToF(kToC(units)));
  }
  else { // F to C or C to F
    return Math.round(unitTo === 'C' ? fToC(units) : cToF(units));
  }
  /* Conversion functions */
  function kToC(unit){ return unit - 273.15; }
  function cToF(unit) { return ((9/5) * unit) + 32; }
  function fToC(unit) { return (unit - 32) * (5/9); }
  }

});
