// var iota = new IOTA({'provider': 'http://node.lukaseder.de:14265'});
var iota = new IOTA({'provider': 'https://node.iota-community.org'});
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
			cache: false,
			url        : '/transfers',
			templateUrl: 'transfers/transfers.html',
			controller : TransfersController
		})
	;
	$urlRouterProvider.otherwise('/login');
}
run.$inject = ['$rootScope', '$mdSidenav', '$state', '$timeout', '$mdDialog', '$http'];
function run($rootScope, $mdSidenav, $state, $timeout, $mdDialog, $http) {
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

	$rootScope.showPopup = function(text) {
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.textContent(text)
				.ok($rootScope.texts.general.ok)
		);
	};
	document.addEventListener("backbutton", function () {
		navigator.app.exitApp();
	}, false);
	document.addEventListener("deviceready", function () {
		if(iotaNative) iotaNative.init();
		$http.get("./texts/en.json")
			.then(function(result){
				$timeout(function() {
					$rootScope.texts = result.data;
				}, 1);
				if(navigator.globalization) {
					navigator.globalization.getPreferredLanguage(
						function(success) {
							if(success && success.value) {
								var lan = success.value.toLowerCase();
								lan = lan.match(/.+?(?=-)/)[0] || lan;
								switch(lan) {
									case 'de':
									case 'es':
									case 'he':
									case 'no':
										$http.get("./texts/" + lan + ".json")
											.then(function(result){
												$timeout(function() {
													$rootScope.texts = result.data;
												}, 1);
											})
											.catch(function() {

											});
									break;
								}
							}
						},
						function(error) {
						},
					)
				}
			})
			.catch(function(error) {
			}
		);
	}, false);
}