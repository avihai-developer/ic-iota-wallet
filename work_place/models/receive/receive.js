angular.module('wallet.controllers').controller('ReceiveController', ReceiveController);
ReceiveController.$inject = ['$scope', '$http', '$state', '$timeout', '$rootScope'];
function ReceiveController($scope, $http, $state, $timeout, $rootScope) {
	$rootScope.navTitle = $rootScope.texts.menu.receive;
	$scope.address = {
		id: '',
		date: ''
	};
	$scope.createAddress = function() {
		$scope.address = {
			id: '',
			date: ''
		};
		$rootScope.loader(true);
		var myWorker = new Worker("./workers/create-address.js");
		myWorker.postMessage([$rootScope.seed, $rootScope.accountData.latestAddress]);
		myWorker.onmessage = function(msg) {
			if (msg.data.error) {
				console.log(msg.data.error);
				switch(msg.data.error) {
					case 'Request Error: inconsistent tips pair selected':
						$scope.createAddress();
						break;
					default:
						$rootScope.showPopup($rootScope.texts.errors.error_please_try_again);
						$rootScope.loader(false);
						break;
				}
			} else {
				console.log(msg.data.success);
				$scope.address.id = msg.data.success[0].address;
				$scope.address.id = iota.utils.addChecksum($scope.address.id, 9, true);
				QRCode.toCanvas(document.getElementById('address'), $scope.address.id, function (error) {
					if (error) console.error(error);
				});
				$rootScope.loader(false);
				$rootScope.loadWalletData();
			}
		};
	};
}