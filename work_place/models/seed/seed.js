angular.module('wallet.controllers').controller('SeedController', SeedController);
SeedController.$inject = ['$scope', '$http', '$state', '$timeout', '$rootScope'];
function SeedController($scope, $http, $state, $timeout, $rootScope) {
	$scope.createSeedQr = function() {
		QRCode.toCanvas(document.getElementById('seedQR'), $rootScope.seed, function (error) {
			if (error) console.error(error);
		});
	};
	$scope.createSeedQr();
}