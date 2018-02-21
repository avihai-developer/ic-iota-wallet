// var iota = new IOTA({'provider': 'http://node.lukaseder.de:14265'});
var iota = new IOTA({'provider': 'http://node.iota-community.org'});
iota.api.getNodeInfo(function(error, success) {
	if (error) {
		console.error('getNodeInfo error', error);
	} else {
		console.log('getNodeInfo success', success);
	}
});
angular.module('templates', []);
angular.module("wallet", [
	'templates',
	'ui.router',
	'ngMaterial'
])
	.config(config)
	.run(run);
angular.module('wallet.controllers', []);
config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];
function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('blue-grey')
		.dark();
	$stateProvider
		.state('login', {
			url        : '/login',
			templateUrl: 'login/login.html',
			controller : LoginController
		})
		.state('layout', {
			abstract: true,
			url        : '',
			templateUrl: 'layout/layout.html',
			controller : LayoutController
		})
		.state('layout.receive', {
			url        : '/receive',
			templateUrl: 'receive/receive.html',
			controller : ReceiveController
		})
		.state('layout.send', {
			url        : '/send',
			templateUrl: 'send/send.html',
			controller : SendController
		})
		.state('layout.transfers', {
			url        : '/transfers',
			templateUrl: 'transfers/transfers.html',
			controller : TransfersController
		})
	;
	$urlRouterProvider.otherwise('/login');
}
run.$inject = ['$rootScope', '$mdSidenav', '$state', '$timeout'];
function run($rootScope, $mdSidenav, $state, $timeout) {
	$rootScope.toggleRight = buildToggler('left');
	function buildToggler(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
		};
	}
	$rootScope.seed = localStorage.getItem('seed') || '';
	try {
		$rootScope.accountData = JSON.parse(localStorage.getItem('AccountData')) || '';
	} catch (e) {
		$rootScope.accountData = '';
	}
	if($rootScope.seed) $state.go('layout.transfers');
	$rootScope.loader = function(show) {
		$timeout(function () {
			$rootScope.showLoader = show;
		}, 1);
	};
	$rootScope.miniLoader = function(show) {
		$timeout(function () {
			$rootScope.showMiniLoader = show;
		}, 1);
	};
}