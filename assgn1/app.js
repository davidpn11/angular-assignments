(function () {
'use strinct';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
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