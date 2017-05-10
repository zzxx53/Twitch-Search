angular.
  module('twitchSearch').
    component('searchBox', {
        templateUrl:'js/search-box/search-box.template.html',
        controller:  ['$routeParams', '$route',function SearchBoxController($routeParams, $route) {
            var self = this;
			self.search = $routeParams.search;
			self.searchChanged = function searchChanged(){
				$route.updateParams({'search': self.search, 'page':1})
			}
			self.keyPressed = function keyPressed($event){
				if ($event.keyCode === 13){
					self.searchChanged();
				}
			}
    }]
})
