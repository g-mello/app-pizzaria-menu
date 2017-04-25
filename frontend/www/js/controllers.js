app = angular.module('app.controllers', [])
  
app.controller('pizzasCtrl', ['$scope', '$stateParams', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
//
function ($scope, $stateParams, $http, $ionicPopup) {
    
    var atualiza_pizzas  = function(){
        $http.get('http://localhost:3000/getPizzas')
        .then(function (response){
            $scope.listaPizzas = response.data;			
            }
        );
    };

    $scope.consultaPizzas= function(){
			atualiza_pizzas();
    };

    $scope.inserirPizza = function(id_pizza){
        var pizza = $scope.pizza;

        $http.post('http://localhost:3000/inserePizza', { "id_pizza": id_pizza }  ) 
            .then(function (response){
                }
            );
                                
        showAlert_ADD();
    };

    $scope.removerPizza = function(id_pizza){
        var pizza = $scope.pizza;

        $http.put('http://localhost:3000/cancelarPizza', { "id_pizza": id_pizza }  ) 
            .then(function (response){
                }
            );
                                
        showAlert_DEL();
    };


    var showAlert_ADD = function() {
        var alertPopup = $ionicPopup.alert({
            title: "Obrigado!",
            template: "Pizza adiciona ao pedido",
            okText: "Fechar",
            okType: "button-balanced"
        });
        
        alertPopup.then(function(res) {
        console.log('Alert pizza add ao pedido');
        });
   };
 
    var showAlert_DEL = function() {
        var alertPopup = $ionicPopup.alert({
            title: "Ok!",
            template: "Pizza removida do pedido",
            okText: "Fechar",
            okType: "button-assertive"
        });
        
        alertPopup.then(function(res) {
        console.log('Alert pizza removida do pedido');
        });
   };
 

}])
   
app.controller('tamanhoCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

    $scope.inserirTamanho = function(tamanho){

        $http.put('http://localhost:3000/insereTamanho', { "tamanho": tamanho }  ) 
            .then(function (response){
                alert("Tamanho add com sucesso");
                }
            );
                                
    };

    $scope.inserirBorda = function(borda){

        $http.put('http://localhost:3000/insereBorda', { "borda": borda}  ) 
            .then(function (response){
                alert("Borda add com sucesso");
                }
            );
                                
    };





}])
    
app.controller('formaDePagamentoCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

    $scope.inserirPagamento = function(pagamento){

        $http.put('http://localhost:3000/inserePagamento', { "pagamento": pagamento}  ) 
            .then(function (response){
                }
            );
                                
    };



}])

app.controller('meuPedidoCtrl', ['$scope', '$stateParams', '$http','$ionicModal', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicModal, $ionicPopup ) {
 
    var atualiza_pedido = function(){
        $http.get('http://localhost:3000/getPedidos')
        .then(function (response){
            $scope.Pedido = response.data;			

            }
        );
    };

    $scope.consultaPedido = function(){
			atualiza_pedido();
    };

     var atualiza_total_pagar = function(){
        $http.get('http://localhost:3000/getTotalPagar')
        .then(function (response){
            $scope.total = response.data;			
            }
        );
    };

     $scope.consultaTotalPagar= function(){
			atualiza_total_pagar();
    };

     $scope.cancelarPedido = function(){
        $http.put('http://localhost:3000/cancelarPedido', {'id_pedido':1})
        .then(function (response){
            $scope.total = response.data;			
            }
        );
     };

    $scope.removerPizza = function(id_pizza){
        var pizza = $scope.pizza;

        $http.put('http://localhost:3000/cancelarPizza', { "id_pizza": id_pizza }  ) 
            .then(function (response){
                }
            );
                                
        showAlert_DEL();
    };


    $scope.inserirTamanho = function(tamanho){

        $http.put('http://localhost:3000/insereTamanho', { "tamanho": tamanho }  ) 
            .then(function (response){
                alert("Tamanho add com sucesso");
                }
            );
                                
    };

    $scope.inserirBorda = function(borda){

        $http.put('http://localhost:3000/insereBorda', { "borda": borda}  ) 
            .then(function (response){
                alert("Borda add com sucesso");
                }
            );
                                
    };



     $scope.atualizarPagamento = function(pagamento){

        $http.put('http://localhost:3000/inserePagamento', { "pagamento": pagamento}  ) 
            .then(function (response){
                }
            );
                                
    };

/*
 * Alerts
 */
    var showAlert_DEL = function() {
        var alertPopup = $ionicPopup.alert({
            title: "Ok!",
            template: "Pizza removida do pedido",
            okText: "Fechar",
            okType: "button-assertive"
        });
        
        alertPopup.then(function(res) {
        console.log('Alert pizza removida do pedido');
        });
   };
 

/*
 * MODALS
 */
 
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
            $scope.modal = modal;
        });
        
        
        $scope.openModal = function() {
            $scope.modal.show();
        };
        
        $scope.closeModal = function() {
            $scope.modal.hide();
        };

}])

app.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
app.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
app.controller('meuCadastroCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
app.controller('cadastrarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 
