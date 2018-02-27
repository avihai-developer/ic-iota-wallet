angular.module('wallet.controllers').controller('LayoutController', LayoutController);
LayoutController.$inject = ['$scope', '$http', '$state', '$timeout', '$rootScope', '$mdSidenav'];
function LayoutController($scope, $http, $state, $timeout, $rootScope, $mdSidenav) {
	$rootScope.currentState = 'layout.transfers';
	$rootScope.scanQr = false;
	if(!$rootScope.seed) $state.go('login');
	$timeout(function() {
		if(navigator.splashscreen) {
			navigator.splashscreen.hide();
		}
	}, 1000);
	$rootScope.loadWalletDataNative = function () {
		if(typeof iotaNative !== 'undefined') {
			// iotaNative.getAccountData($rootScope.seed, function (data) {
			// 	var data = JSON.parse(data);
			// 	console.log('data', data);
			// });
			iotaNative.getNewAddress($rootScope.seed, function (data) {
				var addresses = JSON.parse(data);
				addresses = addresses.addresses;
				console.log('addresses', addresses);
				$timeout(function () {
					var myWorker = new Worker("./workers/get-account-data.js");
					myWorker.postMessage([$rootScope.seed, addresses]);
					myWorker.onmessage = function(msg) {
						$rootScope.loader(false);
						$rootScope.miniLoader(false);
						if (msg.data.error) {
							console.error('getAccountData error', msg.data.error);
						} else {
							msg.data.success = JSON.parse(msg.data.success).data;
							$rootScope.accountData = msg.data.success;
							$rootScope.accountData.miBalance = iota.utils.convertUnits($rootScope.accountData.balance, 'i', 'Mi');
							localStorage.setItem('AccountData', JSON.stringify(msg.data.success));
							localStorage.setItem('lastSync', new Date().getTime());
							if($rootScope.currentState === "layout.transfers") {
								$state.reload();
							}
						}
					};
				}, 1);
			});
		} else {
			$timeout(function () {
				var myWorker = new Worker("./workers/get-account-data.js");
				myWorker.postMessage([$rootScope.seed]);
				myWorker.onmessage = function(msg) {
					$rootScope.loader(false);
					$rootScope.miniLoader(false);
					if (msg.data.error) {
						console.error('getAccountData error', msg.data.error);
					} else {
						msg.data.success = JSON.parse(msg.data.success).data;
						$rootScope.accountData = msg.data.success;
						$rootScope.accountData.miBalance = iota.utils.convertUnits($rootScope.accountData.balance, 'i', 'Mi');
						localStorage.setItem('AccountData', JSON.stringify(msg.data.success));
						localStorage.setItem('lastSync', new Date().getTime());
						if($rootScope.currentState === "layout.transfers") {
							$state.reload();
						}
					}
				};
			}, 1);
		}
	};
	$rootScope.loadWalletData = function () {
		var lastSync = localStorage.getItem('lastSync');
		if(lastSync && (new Date().getTime() - 3000 < lastSync)) {
		} else {
			if(!$rootScope.accountData) {
				$rootScope.loader(true);
				$rootScope.loadWalletDataNative();
			} else {
				$rootScope.miniLoader(true);
				$rootScope.loadWalletDataNative();
			}
		}
	};
	$scope.logout = function () {
		localStorage.clear();
		$state.go('login');
	};
	$scope.selectMenu = function (state) {
		$rootScope.currentState = state;
		$mdSidenav('left').toggle();
		$state.go(state);
	};
	$scope.loadWalletData();
	$rootScope.toggleQR = function () {
		$rootScope.scanQr = !$rootScope.scanQr;
		angular.element(document.querySelector('#layoutId')).toggleClass('scanQr');
		if(!$rootScope.scanQr) {
			QRScanner.hide();
		}
	}
}