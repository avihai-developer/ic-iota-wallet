angular.module('wallet.controllers').controller('TransfersController', TransfersController);
TransfersController.$inject = ['$scope', '$http', '$state', '$timeout', '$rootScope'];
function TransfersController($scope, $http, $state, $timeout, $rootScope) {
	$rootScope.navTitle = $rootScope.texts.menu.transfers;
	$scope.md = {
		transfers : '',
		transfersView : [],
	};
	$scope.setTransfersView = function () {
		$rootScope.accountData.transfers.forEach(function (transfer) {
			$scope.md.transfersView.push($scope.setTransferData(transfer));
		});
		for(var i=0; i<$scope.md.transfersView.length; i++) {
			if($scope.md.transfersView[i].isConfirm) {
				for(var j=0; j<$scope.md.transfersView.length; j++) {
					if(
						!$scope.md.transfersView[j].isConfirm &&
						$scope.md.transfersView[i].createData === $scope.md.transfersView[j].createData &&
						$scope.md.transfersView[i].amount === $scope.md.transfersView[j].amount
					) {
						$scope.md.transfersView[j].show = false;
					}
				}
			}
		}
	};
	$scope.setTransferData = function (transfers) {
		var data = {
			type: '',
			amount: 0,
			date: 0,
			isConfirm: true,
			tag: '',
			createData: 0,
			show: true
		};
		var tempTransfers = [];
		for(var i=0; i<transfers.length; i++) {
			for(var j=0; j<$rootScope.accountData.addresses.length; j++) {
				if(transfers[i].address === $rootScope.accountData.addresses[j]) {
					tempTransfers.push(transfers[i]);
				}
			}
		}
		for(var i=0; i<tempTransfers.length; i++) {
			data.amount = data.amount + tempTransfers[i].value;
			if(tempTransfers[i].attachmentTimestamp> data.date) {
				data.date = tempTransfers[i].attachmentTimestamp;
				data.createData = tempTransfers[i].timestamp * 1000;
			}
			if(!tempTransfers[i].persistence) data.isConfirm = false;
		}
		data.amount = iota.utils.convertUnits(data.amount, 'i', 'Mi');
		return data;
	};
	if($rootScope.accountData) {
		$scope.setTransfersView();
	}
}