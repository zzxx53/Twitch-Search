angular.
  module('twitchSearch').
    component('streamList', {
        templateUrl:'js/stream-list/stream-list.template.html',
        controller:  ['$routeParams','$http', '$route',function StreamListController($routeParams, $http, $route) {
            var self = this;
			self.perPageValues=[10,20,50];
			self.search = $routeParams.search;
			self.perPage=+$routeParams.perPage || 10;
			self.page=+$routeParams.page || 1;
			var offset=self.perPage*(self.page-1);
			
			self.perPageChanged = function perPageChanged(){
				$route.updateParams({'perPage':self.perPage, 'page':1})
			}
			
			self.getResults = function getResults(){          
				$http.get("https://api.twitch.tv/kraken/search/streams?q="+self.search+"&limit="+self.perPage+"&offset="+offset, {
					headers: {'Client-ID': 'qsd7ewlmzgiqs3313ud3eqkn7m3npt'}
					}).then(function(response) {
						self.streams = response.data.streams;
						self.numResults = response.data._total;
						self.hasNextPage = self.page<=(self.numResults/self.perPage);
						self.prevLink='javascript:void(0);';
						if (self.page > 1){
							self.prevLink='#!/'+self.search+'/'+self.perPage+'/'+(self.page-1);
						}
						self.nextLink='javascript:void(0);';
						if (self.hasNextPage){
							self.nextLink='#!/'+self.search+'/'+self.perPage+'/'+(self.page+1);
						}
						self.totalPages = Math.ceil(self.numResults/self.perPage);
				});   
			}
			if (self.search){
				self.getResults();
			}
    }]
})
