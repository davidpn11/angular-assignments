(function () {
'use strinct';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('NarrowItDownService', NarrowItDownService)
.directive('foundItems',FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
	var ddo = {
		templateUrl:'foundItems.html',		
		scope:{
			found: '<',
			onRemove: '&'
		},
		controller: NarrowItDownController,
		controllerAs:'ctrl',		
	};

	return ddo;
  }



NarrowItDownController.$inject = ['NarrowItDownService'];
function NarrowItDownController(NarrowItDownService){
	var ctrl = this;	
	//ctrl.list = [{"description":"oi"},{"description":"tchau"}];
	ctrl.term = "";	
	ctrl.list = [];	
	ctrl.searchItems = function () {
		console.log("Searching for "+ctrl.term);
		ctrl.list = NarrowItDownService.getMatchedMenuItems(ctrl.term);		
	};

	ctrl.removeItem = function(itemIndex){
		console.log("Removing...");
		ctrl.list.splice(itemIndex,1);
	};

	ctrl.emptyList = function () {
		if(ctrl.list.length==0){			
			return true;
		}else{
			return false;
		}
	};
};

	// promise.then(function (response) {
	// 	narrow.menu = response;	
	// 	console.log(narrow.menu);
	// }).catch(function (error) {
	// 	console.log("ERROR");
	// });
	


NarrowItDownService.$inject = ['$http','ApiBasePath'];
function NarrowItDownService($http,ApiBasePath){
	
	var service = this;
	var list = [];

	service.getMatchedMenuItems = function (searchTerm) {  
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
		}).then(function success(response){			
			
			var filter_response = [];
			var items = response.data.menu_items;			
			 for(var i =0; i < items.length; i++){
			 	var description = items[i].description;
		
			 	if(description.indexOf(searchTerm) > 0){
			 		filter_response.push(items[i]);
			 	    //console.log(description);
			 	}
			 }
			 console.log("Total: "+items.length+"--Filtered: "+filter_response.length);
			return filter_response;		
			//list = filter_response;

		},function error(response) {
			console.log("ERROR");
		}
		);	
	};
	
};


})();

