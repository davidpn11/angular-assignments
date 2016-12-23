(function () {
'use strinct';

var toBuyList = [
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
.factory('ShoppingListFactory', ShoppingListFactory);



ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

	var list1 = this;

	var shoppingList = ShoppingListFactory();

	list1.items = toBuyList;

	console.log("List1 size:",list1.items.length);

	list1.addItem = function(){
		shoppingList.addItem(list1.itemName,list1.quantity);
	};

	list1.removeItem = function(itemIndex){
		console.log("remove");
		shoppingList.removeItem(itemIndex);
	};
}


ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

	var list2 = this;

	var shoppingList = ShoppingListFactory();

	list2.items = shoppingList.getItems();
	console.log("List2 size:",list2.items.length);

	list2.addItem = function(){
		shoppingList.addItem(list1.itemName,list1.quantity);
	};

	list2.removeItem = function(itemIndex){
		shoppingList.removeItem(itemIndex);
	};
}



function ShoppingListService() {
	var service = this;
	var items = [];

	service.additem = function(itemName,quantity){
		var item = {
			name: itemName,
			quantity: quantity
		};
		items.push(item);
	};

	service.removeItem = function(itemIndex){
		items.splice(itemIndex,1);
	};

	service.getItems = function(){
		return items;
	};

}

function ShoppingListFactory(){
	var factory = function (){
		return new ShoppingListService();
	};
	return factory;
}


})();