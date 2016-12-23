(function () {
'use strinct';

var initList = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  }
];


angular.module('ShoppingListApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.service('ShoppingListService', ShoppingListService);



ShoppingListController1.$inject = ['ShoppingListService'];
function ShoppingListController1(ShoppingListService) {

	var list1 = this;

	list1.items = ShoppingListService.getToBuy();

	console.log("List1 size:",list1.items.length);

	list1.checkOff = function(itemIndex){
		ShoppingListService.checkOff(itemIndex);
	};

}


ShoppingListController2.$inject = ['ShoppingListService'];
function ShoppingListController2(ShoppingListService) {

	var list2 = this;
	
	list2.items = ShoppingListService.getBougth();
	console.log("List2 size:",list2.items.length);

	// list2.addItem = function(){
	// 	shoppingList.addItem(list1.itemName,list1.quantity);
	// };

	// list2.removeItem = function(itemIndex){
	// 	shoppingList.removeItem(itemIndex);
	// };
}



function ShoppingListService() {
	var service = this;
	var toBuyList = initList;
	var bougthList = [];


	service.checkOff = function(itemIndex){
		var temp = toBuyList[itemIndex];
		console.log("Item to check off:",temp);
		toBuyList.splice(itemIndex,1);
		bougthList.push(temp);
	};

	service.getToBuy = function(){
		return toBuyList;
	};

	service.getBougth = function(){
		return bougthList;
	};

}


})();