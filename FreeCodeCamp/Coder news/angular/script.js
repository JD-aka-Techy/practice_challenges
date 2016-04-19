// uses //cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.min.js

(function(){
var app = angular.module('TestApp',[])

app.factory('GetServ',['$http',function($http){
  var GetServ = {};

  GetServ.getNews = function(){
    return $http.get('http://www.freecodecamp.com/stories/hotStories');
  }
  return GetServ;

}]);

app.controller('MainController',function(GetServ){
  var wut = this;
  this.first = 'wutwut';

  GetServ.getNews().success(function(data){
    wut.first = data;
  });

});

})();
