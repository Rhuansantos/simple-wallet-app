(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wallet = function () {
  function Wallet() {
    _classCallCheck(this, Wallet);

    this.data = [];
    this.render();
  }

  _createClass(Wallet, [{
    key: 'loadData',
    value: async function loadData() {
      try {
        var transactionList = await fetch('./data/transactionList.json');
        var data = await transactionList.json();
        this.data.push(data);
        return data;
      } catch (e) {
        return e;
      }
    }
  }, {
    key: 'util',
    value: function util(n) {
      console.log(n);
    }
  }, {
    key: 'createCards',
    value: function createCards() {
      var printContainer = document.querySelector('#cards');
      this.loadData().then(function (data) {
        data.map(function (card, index) {
          // HTML Template
          var template = '\n          <li data-id=' + card.id + '>\n            <img src="./img/visa.png" alt="card" />\n            <p>' + card.number + '</p>\n            <p>Valid Thru: ' + card.valid + '</p>\n          </li>\n        ';
          // print html
          printContainer.insertAdjacentHTML('afterbegin', template);
        });
      }).catch(function (reason) {
        return console.log(reason.message);
      });
    }
  }, {
    key: 'transactions',
    value: function transactions(_id) {
      var printContainer = document.querySelector('#transactionList');
      this.loadData().then(function (data) {
        data['0'].transactions.map(function (transaction, index) {
          console.log(transaction);
          var template = '\n          <li>\n            <div class="transactionIcons"><span class="plus">+</span></div>\n            <div>\n              <h2>' + transaction.store + '</h2>\n              <p>' + (transaction.description, transaction.date) + '</p>\n            </div>\n            <span class="transactionValue">' + transaction.price + '</span>\n          </li>\n        ';
          printContainer.insertAdjacentHTML('afterbegin', template);
        });
      }).catch(function (reason) {
        return console.log(reason.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      this.createCards();
      this.transactions();
    }
  }]);

  return Wallet;
}();

exports.default = Wallet;

},{}],2:[function(require,module,exports){
'use strict';

var _wallet = require('./core/wallet');

var _wallet2 = _interopRequireDefault(_wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  var walletApp = new _wallet2.default();
});

},{"./core/wallet":1}]},{},[2]);
