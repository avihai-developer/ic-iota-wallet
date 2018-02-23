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
	$scope.onType = function () {
		if($scope.md.seed.length === 81) {
			$scope.md.seed = $scope.md.seed.toUpperCase();
			localStorage.setItem('seed', $scope.md.seed);
			$rootScope.seed = $scope.md.seed;
			$state.go('layout.transfers');
		}
	};
	$scope.generateSeed = function () {
		var final_seed = '';
		var random_array = new Uint32Array(1);
		var created_chars = 0;
		while (created_chars < 81) {
			window.crypto.getRandomValues(random_array);
			random_array[0] = (random_array[0] % 33) + 57;
			if ((random_array[0] >= 65 && random_array[0] <= 90) || random_array[0] == 57) {
				final_seed += String.fromCharCode(random_array[0]);
				created_chars += 1;
			}
		}
		localStorage.setItem('seed', final_seed);
		$rootScope.seed = final_seed;
		$state.go('layout.transfers');
	};
}