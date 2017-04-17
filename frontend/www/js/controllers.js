app = angular.module('app.controllers', [])
  
app.controller('pizzasCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
//
function ($scope, $stateParams, $http) {
    
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
                alert("Pizza add com sucesso");
                }
            );
                                
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





}])
    
app.controller('formaDePagamentoCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

    $scope.inserirPagamento = function(pagamento){

        $http.put('http://localhost:3000/inserePagamento', { "pagamento": pagamento}  ) 
            .then(function (response){
                alert("Pagamento add com sucesso");
                }
            );
                                
    };



}])

app.controller('meuPedidoCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {
 
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
 
