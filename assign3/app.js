(function () {
'use strinct';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController);

NarrowItDownController.$inject = ['$scope'];

function NarrowItDownController($scope){
	$scope.foodList = "";
	$scope.message = "";
	$scope.getList = function () {			
		var input = $scope.foodList;	
		if(input ==""){
			$scope.message = "Please enter data first";
			return;
		}
		size = input.split(',').length;
		
		if(size <=3){
			$scope.message = "Enjoy!";
		}else{
			$scope.message = "Too Much!";
		}

		 
	};
}


})();