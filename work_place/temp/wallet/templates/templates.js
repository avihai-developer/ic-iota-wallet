angular.module('templates').run(['$templateCache', function($templateCache) {$templateCache.put('layout/layout.html','<div class="page-model page-model-layout" id="layoutId"><md-toolbar class="app-tool-bar md-hue-2"><md-button class="md-icon-button" aria-hidden="true" ng-click="toggleRight()"><i class="fa fa-bars" aria-hidden="true"></i></md-button><div class="nav-title">{{navTitle}}</div><div class="balance">Balance: {{accountData.miBalance}} Mi</div><i class="refresh fa fa-refresh" aria-hidden="true" ng-click="loadWalletData()"></i></md-toolbar><md-sidenav class="app-nav-menu md-sidenav-left md-whiteframe-4dp" md-component-id="left"><div class="header"><img src="./images/iota-logo.svg"/></div><div class="menu-item" ng-click="selectMenu(&quot;layout.transfers&quot;)" ng-class="currentState === &quot;layout.transfers&quot; ? &quot;active&quot; : &quot;&quot;"><i class="fa fa-history" aria-hidden="true"></i><div class="text">Transfers</div></div><div class="menu-item" ng-click="selectMenu(&quot;layout.send&quot;)" ng-class="currentState === &quot;layout.send&quot; ? &quot;active&quot; : &quot;&quot;"><i class="fa fa-paper-plane" aria-hidden="true"></i><div class="text">Send</div></div><div class="menu-item" ng-click="selectMenu(&quot;layout.receive&quot;)" ng-class="currentState === &quot;layout.receive&quot; ? &quot;active&quot; : &quot;&quot;"><i class="fa fa-download" aria-hidden="true"></i><div class="text">Receive</div></div><div class="menu-item last" ng-click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i><div class="text">Sign Out</div></div></md-sidenav><ui-view class="inner-view"></ui-view><div class="loader" ng-show="showLoader"><div class="img-box"><img src="./images/iota-logo.svg"/><div class="text">It\'s not stuck just slow</div></div></div><div class="mini-loader" ng-show="showMiniLoader"><img src="./images/iota-logo.svg"/><div class="text">Sync wallet (It\'s not stuck)</div></div><div class="qr"><div class="header"><div class="back" ng-click="toggleQR()"><i class="fa fa-arrow-left" aria-hidden="true"></i></div><div class="text">{{ scanQrText }}</div></div><div class="scan-box"></div><div class="close"></div></div></div>');
$templateCache.put('login/login.html','<div class="page-model page-model-login" ng-class="md.mode === &quot;qr&quot; ? &quot;transparent&quot; : &quot;&quot;"><div class="type" ng-show="md.mode === &quot;type&quot;"><div class="text">Enter your seed or create one randomly</div><div class="seed-input"><div class="text">{{md.seed.length}} / 81</div><div class="qr" ng-click="scan()"><i class="fa fa-qrcode" aria-hidden="true"></i></div></div><div class="seed-btns"><div class="line"><div class="seed-btn" ng-click="addChar(&quot;A&quot;)">A</div><div class="seed-btn" ng-click="addChar(&quot;B&quot;)">B</div><div class="seed-btn" ng-click="addChar(&quot;C&quot;)">C</div><div class="seed-btn" ng-click="addChar(&quot;D&quot;)">D</div><div class="seed-btn" ng-click="addChar(&quot;E&quot;)">E</div></div><div class="line"><div class="seed-btn" ng-click="addChar(&quot;F&quot;)">F</div><div class="seed-btn" ng-click="addChar(&quot;G&quot;)">G</div><div class="seed-btn" ng-click="addChar(&quot;H&quot;)">H</div><div class="seed-btn" ng-click="addChar(&quot;I&quot;)">I</div><div class="seed-btn" ng-click="addChar(&quot;J&quot;)">J</div></div><div class="line"><div class="seed-btn" ng-click="addChar(&quot;K&quot;)">K</div><div class="seed-btn" ng-click="addChar(&quot;L&quot;)">L</div><div class="seed-btn" ng-click="addChar(&quot;M&quot;)">M</div><div class="seed-btn" ng-click="addChar(&quot;N&quot;)">N</div><div class="seed-btn" ng-click="addChar(&quot;O&quot;)">O</div></div><div class="line"><div class="seed-btn" ng-click="addChar(&quot;P&quot;)">P</div><div class="seed-btn" ng-click="addChar(&quot;Q&quot;)">Q</div><div class="seed-btn" ng-click="addChar(&quot;R&quot;)">R</div><div class="seed-btn" ng-click="addChar(&quot;S&quot;)">S</div><div class="seed-btn" ng-click="addChar(&quot;T&quot;)">T</div></div><div class="line"><div class="seed-btn" ng-click="addChar(&quot;U&quot;)">U</div><div class="seed-btn" ng-click="addChar(&quot;V&quot;)">V</div><div class="seed-btn" ng-click="addChar(&quot;W&quot;)">W</div><div class="seed-btn" ng-click="addChar(&quot;X&quot;)">X</div><div class="seed-btn" ng-click="addChar(&quot;Y&quot;)">Y</div></div><div class="line last"><div class="seed-btn" ng-click="addChar(&quot;Z&quot;)">Z</div><div class="seed-btn" ng-click="addChar(&quot;9&quot;)">9</div></div></div></div><div class="qr" ng-show="md.mode === &quot;qr&quot;"><div class="header"><div class="back" ng-click="closeQrScan()"><i class="fa fa-arrow-left" aria-hidden="true"></i></div><div class="text">Scan your seed</div></div><div class="scan-box"></div><div class="close"></div></div></div>');
$templateCache.put('main/main.html','<html ng-app="wallet" dir="ltr" ng-cloak="ng-cloak"><head><meta charset="UTF-8"/><meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"/><meta http-equiv="Content-Security-Policy" content="default-src * data: blob: ws: wss: gap://ready file://*; style-src * \'unsafe-inline\'; script-src * \'unsafe-inline\' \'unsafe-eval\'; connect-src * ws: wss:;"/><title>iota-community-wallet-app</title><link rel="stylesheet" type="text/css" href="./index.css"/><script type="text/javascript" src="cordova.js"></script><script async="async" src="./index.js"></script></head><body><ui-view></ui-view></body></html>');
$templateCache.put('receive/receive.html','<div class="page-inner-model page-model-receive"><div class="create-btn" ng-click="createAddress()"><div class="text">Create new address</div></div><div class="address"><div class="id">{{ address.id }}</div><canvas class="qr-canvas" id="address"></canvas></div></div>');
$templateCache.put('send/send.html','<div class="page-inner-model page-model-send"><div class="address"><div class="label">Address</div><input ng-model="md.address"/><i class="fa fa-qrcode" aria-hidden="true" ng-click="scanAddress()"></i></div><div class="amount"><div class="label">Amount</div><input type="number" ng-model="md.amount"/><div class="unit" ng-click="toggleUnits()">{{md.unit}}</div><div class="units"><div class="opt" ng-repeat="unit in md.units" ng-click="md.unit = unit.key; toggleUnits();">{{unit.value}}</div></div><!--select(ng-model=\'md.unit\', ng-options=\'option for option in md.units\')--></div><div class="send-btn" ng-click="send()"><div class="text">Send</div></div></div>');
$templateCache.put('transfers/transfers.html','<div class="page-inner-model page-model-transfers"><div class="transfers-box"><div class="no-transfers" ng-if="md.transfersView.length === 0">No transfers</div><div class="transfer" ng-repeat="transfer in md.transfersView | orderBy: &quot;-date&quot;" ng-if="transfer.show"><div class="sent" ng-if="transfer.amount &lt; 0"><i class="type-icon fa fa-paper-plane"></i><div class="amount">- {{transfer.amount * -1}} Mi</div><div class="date">{{transfer.date | date: \'dd/MM/yyyy HH:mm\'}}</div><i class="fa fa-check" aria-hidden="true" ng-if="transfer.isConfirm"></i><img class="in-progress" src="./images/iota-logo-gray.svg" ng-show="!transfer.isConfirm"/></div><div class="recive" ng-if="transfer.amount &gt; 0"><i class="type-icon fa fa-download"></i><div class="amount">+ {{transfer.amount}} Mi</div><div class="date">{{transfer.date | date: \'dd/MM/yyyy HH:mm\'}}</div><i class="fa fa-check" aria-hidden="true" ng-if="transfer.isConfirm"></i><img class="in-progress" src="./images/iota-logo-gray.svg" ng-show="!transfer.isConfirm"/></div><div class="new-wallet" ng-if="transfer.amount === 0"><i class="type-icon fa fa-qrcode"></i><div class="amount">New Address</div><div class="date">{{transfer.date | date: \'dd/MM/yyyy HH:mm\'}}</div><i class="fa fa-check" aria-hidden="true"></i></div></div></div></div>');}]);