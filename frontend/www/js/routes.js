angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.pizzas', {
    url: '/pizzas',
    views: {
      'tab1': {
        templateUrl: 'templates/pizzas.html',
        controller: 'pizzasCtrl'
      }
    }
  })

  .state('tabsController.tamanho', {
    url: '/tamanho',
    views: {
      'tab4': {
        templateUrl: 'templates/tamanho.html',
        controller: 'tamanhoCtrl'
      }
    }
  })

  .state('tabsController.meuPedido', {
    url: '/pedido',
    views: {
      'tab2': {
        templateUrl: 'templates/meuPedido.html',
        controller: 'meuPedidoCtrl'
      }
    }
  })

  .state('tabsController.formaDePagamento', {
    url: '/pagamento',
    views: {
      'tab5': {
        templateUrl: 'templates/formaDePagamento.html',
        controller: 'formaDePagamentoCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('meuCadastro', {
    url: '/meu_cadastro',
    templateUrl: 'templates/meuCadastro.html',
    controller: 'meuCadastroCtrl'
  })

  .state('cadastrar', {
    url: '/cadastro',
    templateUrl: 'templates/cadastrar.html',
    controller: 'cadastrarCtrl'
  })
  
  .state('finalizado', {
    url: '/finalizado',
    templateUrl: 'templates/finalizado.html',
    controller: 'finalizadoCtrl'
  })
  
$urlRouterProvider.otherwise('/login')
 

});