angular.module('wallet.controllers').controller('LoginController', LoginController);
LoginController.$inject = ['$scope', '$http', '$state', '$timeout', '$rootScope'];
function LoginController($scope, $http, $state, $timeout, $rootScope) {
	$timeout(function() {
		if(navigator.splashscreen) {
			navigator.splashscreen.hide();
		}
	}, 1000);
	$scope.busy = false;
	$scope.md = {
		mode: 'type',
		// mode: 'qr',
		seed: ''
	};
	$scope.addChar = function(char) {
		if($scope.md.seed.length + 1 <= 81) {
			$scope.md.seed+=char;
		}
		if($scope.md.seed.length === 81) {
			localStorage.setItem('seed', $scope.md.seed);
			$rootScope.seed = $scope.md.seed;
			$state.go('layout.transfers');
		}
	};
	$scope.scan = function () {
		QRScanner.prepare(function (err, status) {
			if(err) return;
			if (status.authorized) {
				$timeout(function () {
					$scope.md.mode = 'qr';
					QRScanner.scan(function (err, text) {
						QRScanner.hide(function (status) {
							if(text.length === 81) {
								localStorage.setItem('seed', text);
								$rootScope.seed = text;
								$state.go('layout.transfers');
							} else {
								$timeout(function() {
									$scope.md.mode = 'type';
								}, 1);
							}
						});
					});
					QRScanner.show(function (status) {
						console.log('status', status);
					});
				}, 100);
			} else if (status.denied) {
			} else {
			}
		});
	};
	$scope.closeQrScan = function () {
		QRScanner.hide(function (status) {
			$timeout(function() {
				$scope.md.mode = 'type';
			}, 1);
		});
	};
}