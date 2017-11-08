(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _wallet = require('./wallet');

var _wallet2 = _interopRequireDefault(_wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// waiting for the page loading
window.addEventListener('load', function () {

  var walletApp = _wallet2.default.getInstance();

  // listening to event click on the LI element inside of #cards
  document.querySelector('#cards').addEventListener('click', function (e) {
    if (e.target && e.target.nodeName == "LI") {
      var id = e.target.getAttribute('data-id');
      walletApp.transactions(id);

      // adding active class to the list
      var elements = document.querySelector('#cards').children;
      for (var i = 0; i < elements.length; ++i) {
        elements[i].classList.remove('active');
      }
      e.target.classList.add('active');
    }
  });
});

},{"./wallet":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wallet = function () {
  /**
   * Creates an instance of Wallet.
   * @memberof Wallet
   */
  function Wallet() {
    var _this = this;

    _classCallCheck(this, Wallet);

    this.data = [];
    // after the data be ready load the function
    this.loadData().then(function (data) {
      return data;
    }).then(function (data) {
      _this.data = data;
      _this.createCards();
      _this.transactions();
    });
  }

  // singleton
  // assuming that the wallet app could be a part of an application 
  // I have applied the singleton programming design pattern
  // so it can allow the application to have only one instance of the app.


  _createClass(Wallet, [{
    key: 'loadData',
    value: async function loadData() {
      try {
        var transactionList = await fetch('./data/transactionList.json');
        var data = await transactionList.json();
        return data;
      } catch (e) {
        return e;
      }
    }

    // current balance

  }, {
    key: 'balance',
    value: function balance(_n) {
      var withdrawn = [];
      var deposit = [];
      // mapping objects
      _n.map(function (transactions, index) {
        if (transactions.price.charAt(0) === '-') {
          withdrawn.push(parseInt(transactions.price));
        } else {
          deposit.push(parseInt(transactions.price));
        }
      });

      // total of deposits and withdram = balance
      var totalDeposit = deposit.reduce(function (sum, value) {
        return sum + value;
      });
      var totalwithdrawn = withdrawn.reduce(function (sum, value) {
        return sum + value;
      });
      var balance = totalDeposit + totalwithdrawn;

      // return as a currency
      return balance.toLocaleString('de-DE');
    }
  }, {
    key: 'createCards',
    value: async function createCards() {
      var printContainer = document.querySelector('#cards');
      this.data.map(function (card, index) {
        // let active;
        // if(index == 0){
        //   active = 'active';
        // }
        var template = '\n          <li class="' + (index == 0 ? 'active' : '') + '" data-id=' + index + '>\n            <img src="./img/visa.png" alt="card" />\n            <p>' + card.number + '</p>\n            <p>Valid Thru: ' + card.valid + '</p>\n          </li>\n        ';
        // print html
        printContainer.insertAdjacentHTML('beforeend', template);
      });
    }
  }, {
    key: 'transactions',
    value: async function transactions(_id, _data) {
      var _this2 = this;

      // start with the first card on the array
      if (_id === undefined) {
        _id = 0;
      }

      var printContainer = document.querySelector('#transactionList');
      printContainer.innerHTML = null; // clean the old content before insert

      this.loadData().then(function (data) {
        // current balance
        var balance = _this2.balance(data[_id].transactions);
        document.querySelector('.balance').innerHTML = '$' + balance;

        //maping transactions
        _this2.data[_id].transactions.map(function (transaction, index) {

          // checking the transaction type
          var type = {};

          if (transaction.price.charAt(0) === '-') {
            type.transaction = 'withdrawn';
            type.symbol = '-';
            type.class = 'minus';
          } else {
            type.transaction = 'deposit';
            type.symbol = '+';
            type.class = 'plus';
          }

          var template = '\n          <li>\n            <div class="transactionIcons"><span class="' + type.class + '"></span>' + type.symbol + '</div>\n            <div>\n              <h2>' + transaction.store + '</h2>\n              <p>' + transaction.description + ', ' + transaction.date + '</p>\n            </div>\n            <span class="transactionValue ' + type.transaction + '">' + transaction.price + '</span>\n          </li>\n        ';

          printContainer.insertAdjacentHTML('beforeend', template);
        });
      }).catch(function (reason) {
        return console.log(reason.message);
      });
    }
  }], [{
    key: 'getInstance',
    value: function getInstance() {
      if (!Wallet._instance) {
        Wallet._instance = new Wallet();
        return Wallet._instance;
      } else {
        throw 'App was already created';
      }
    }
  }]);

  return Wallet;
}();

exports.default = Wallet;

},{}]},{},[1]);
