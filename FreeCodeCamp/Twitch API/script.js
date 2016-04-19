/* uses //cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js */

(function(){

var app = angular.module('TwitchApp',[]);

/* Service factory */
app.factory('GetServ',['$http',function($http){
  var GetServ = {};

  /* returns channel obj
  *  {status:online/offline;name:name;logo:img}
  *  information on provided twitch channel
  *  TODO?: stop second api call if channel is dead
  *  TODO: reduce api calls?
  */
  GetServ.getInfo = function(channel){
    var url = "https://api.twitch.tv/kraken/",
        callback = '?callback=JSON_CALLBACK',
        details = {'call':channel};
    //call streams api to check channel status
    $http.jsonp(url + 'streams/' +  channel + callback)
         .success(function(data){
           // set status of channel
           if (data.error) {
             details.status = 'dead'
           }
           else {
             details.status = data.stream === null ? 'offline' : 'online';
           }
           // call channels api for further channel info.
           $http.jsonp(url + 'channels/' +  channel + callback)
             .success(function(data){
               details.name = data.name;
               details.logo = data.logo;
               details.url = data.url;
               details.streaming = data.status
             });
         });
    return details;
  }
  return GetServ;
}]);

/* Main application controller */
app.controller('MainController',function(GetServ){

  var wut = this; //this proxy
  this.channels = []; // array for storage of channel data

  // list of streamers.
  this.list = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff",'brunofin','comster404','MedryBW'];
  // loop streamers
  this.list.forEach(function(item){
    var info = GetServ.getInfo(item); // returns channel info object
    wut.channels.push(info); // add to channels array
  });
});

})();
