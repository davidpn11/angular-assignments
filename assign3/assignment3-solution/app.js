angular.module('MenuItemsApp', [])
.controller('MenuController',MenuController)
.directive('foundItems',foundItemsDirective)
.service('MenuService',MenuService);


function foundItemsDirective() {
    var ddo = {
        templateUrl:'foundItems.html',
        scope:{
            items: '<',
            onRemove: '&' 
        },
        controller: MenuController,
        controllerAs: 'ctrl',
        bindToController: true
    };
    return ddo;
}

MenuController.$inject = ['MenuService']
function MenuController(MenuService) {
    let ctrl = this;
    ctrl.found_items = [];
    MenuService.retrieveDataFromAPI();

    ctrl.makeSearch = () => {
        ctrl.found_items = [];
        ctrl.has_searched = true;
        let all_items = MenuService.getMenuItems();
        if(this.filter != undefined && this.filter != ""){
            for(var i = 0; i < all_items.length; i++){
                let item = all_items[i];
                if((item.description.toLowerCase().indexOf(this.filter)) !== -1 ){
                    ctrl.found_items.push(item);
                }
            }
            console.log(ctrl.found_items);
        }
    };

    ctrl.removeItem = (itemIndex) =>{        
        ctrl.found_items.splice(itemIndex,1);
    };

    ctrl.hasItems = (items) => {        
        if(items.length == 0){
            return true;
        }else{
            return false;
        }
    };
}

MenuService.$inject = ['$http']
function MenuService($http) {
    let items = [];

    this.getMenuItems = () => {      
        return this.items;        
    };

    this.retrieveDataFromAPI = () => {
        if(items.length == 0){
            $http({
                method: "GET",
                url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
            })
            .then((response) => {
                this.items = response.data.menu_items;
            })
            .catch((error) => {
                console.log(error);
            });            
        }        
    };
}    