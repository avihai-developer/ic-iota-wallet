angular.module('wallet.controllers').controller('SendController', SendController);
SendController.$inject = ['$scope', '$http', '$state', '$timeout', '$rootScope'];
function SendController($scope, $http, $state, $timeout, $rootScope) {
	$rootScope.navTitle = 'Send';
	$scope.md = {
		busy: false,
		address: '',
		unit: 'Mi',
		units: [
			{
				key: 'i',
				value: 'i'
			},
			{
				key: 'Ki',
				value: 'Ki - 1000 i'
			},
			{
				key: 'Mi',
				value: 'Mi - 1000000 i'
			},
			{
				key: 'Gi',
				value: 'Gi - 1000000000 i'
			},
			{
				key: 'Ti',
				value: 'Ti - 1000000000000 i'
			},
			{
				key: 'Pi',
				value: 'Pi - 1000000000000000 i'
			}
		],
		amount: 0
	};
	$scope.scanAddress = function () {
		$scope.md.address = '';
		QRScanner.prepare(function (err, status) {
			if(err) return;
			if (status.authorized) {
				$timeout(function () {
					$rootScope.toggleQR();
					$rootScope.scanQrText = 'Scan Address';
					QRScanner.scan(function (err, text) {
						$timeout(function () {
							if(text.length === 90) {
								$scope.md.address = text;
							} else {
								try {
									text = JSON.parse(text);
									if(text.address && text.address.length === 90) {
										$scope.md.address = text.address;
									} else {
									}
								} catch (error) {
								}
							}
							$rootScope.toggleQR();
						}, 1);
					});
					QRScanner.show(function (status) {
					});
				}, 100);
			}
		});
	};
	$scope.toggleUnits = function () {
		$('.page-model-send .amount .units').slideToggle();
	};
	$scope.send = function () {
		$rootScope.loader(true);
		var myWorker = new Worker("./workers/send-transaction.js");
		var amount = 0;
		switch($scope.md.unit) {
			case 'i':
				amount = $scope.md.amount;
				break;
			case 'Ki':
				amount = $scope.md.amount * 1000;
				break;
			case 'Mi':
				amount = $scope.md.amount * 1000000;
				break;
			case 'Gi':
				amount = $scope.md.amount * 1000000000;
				break;
			case 'Ti':
				amount = $scope.md.amount * 1000000000000;
				break;
			case 'Pi':
				amount = $scope.md.amount * 1000000000000000;
				break;
		}
		myWorker.postMessage([$rootScope.seed, $scope.md.address, amount]);
		myWorker.onmessage = function(msg) {
			if (msg.data.error) {
				console.log(msg.data.error);
				switch(msg.data.error) {
					case 'Request Error: inconsistent tips pair selected':
						$scope.send();
						break;
					case 'Not enough balance':
						$rootScope.loader(false);
						$rootScope.showPopup('Not enough balance.');
						break;
					default:
						$rootScope.loader(false);
						$rootScope.showPopup('Error, please try again.');
						break;
				}
			} else {
				console.log(msg.data.success);
				$rootScope.loader(false);
				$rootScope.showPopup('Your transaction has been sent successfully.');
			}
		};
	}
}