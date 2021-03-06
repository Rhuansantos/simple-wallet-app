export default class Wallet {
/**
 * Creates an instance of Wallet.
 * @memberof Wallet
 */
constructor() {
    this.data = [];
    // after the data be ready load the function
    this.loadData().then((data) => { return data})
    .then((data) => { 
      this.data = data;
      this.createCards();
      this.transactions();
    });
  }

  // singleton
  // assuming that the wallet app could be a part of an application 
  // I have applied the singleton programming design pattern
  // so it can allow the application to have only one instance of the app.
  static getInstance(){
    if(!Wallet._instance){
            Wallet._instance = new Wallet();
            return Wallet._instance;
    }
    else{
          throw 'App was already created';
    }
  }

  async loadData() {
      try {
        const transactionList = await fetch('./data/transactionList.json');
        const data = await transactionList.json();
        return data;
      } catch (e) {
          return e;
      }
  }
  
  // current balance
  balance(_n){
    const withdrawn = [];
    const deposit   = [];
    // mapping objects
    _n.map((transactions, index) => {
      if(transactions.price.charAt(0) === '-'){
        withdrawn.push(parseInt(transactions.price));
      }else{
        deposit.push(parseInt(transactions.price));
      }
    });

    // total of deposits and withdram = balance
    const totalDeposit = deposit.reduce((sum, value) => sum + value);
    const totalwithdrawn = withdrawn.reduce((sum, value) => sum + value);
    const balance = totalDeposit + totalwithdrawn;
    
    // return as a currency
    return balance.toLocaleString('de-DE');
  }

  async createCards() {
    const printContainer = document.querySelector('#cards');
      this.data.map((card, index) => {
        let template = `
          <li class="${index == 0 ? 'active' : ''}" data-id=${index}>
            <img src="./img/${card.company}.png" alt="card" />
            <p>**** **** **** ${card.number.toString().slice(-4)}</p>
            <p>Valid Thru: ${card.valid}</p>
          </li>
        `;
        // print html
        printContainer.insertAdjacentHTML('beforeend', template);

      });
  }

  async transactions(_id, _data){
    // start with the first card on the array
    if(_id === undefined){
      _id = 0;
    }

    const printContainer = document.querySelector('#transactionList');
    printContainer.innerHTML = null; // clean the old content before insert

    this.loadData().then((data) => { 
      // current balance
      const balance = this.balance(data[_id].transactions);
      document.querySelector('.balance').innerHTML = '$' + balance;

      //maping transactions
      this.data[_id].transactions.map((transaction, index) => {
        
        // checking the transaction type
        let type = {};
        
        if(transaction.price.charAt(0) === '-'){
          type.transaction = 'withdrawn';
          type.symbol = '-';
          type.class = 'minus';
        }
        else{
          type.transaction = 'deposit';
          type.symbol = '+';
          type.class = 'plus';
        }

        let template = `
          <li>
            <div class="transactionIcons"><span class="${type.class}"></span>${type.symbol}</div>
            <div>
              <h2>${transaction.store}</h2>
              <p>${transaction.description}, ${transaction.date}</p>
            </div>
            <span class="transactionValue ${type.transaction}">${transaction.price}</span>
          </li>
        `;

          printContainer.insertAdjacentHTML('beforeend', template);
      });

    }).catch(reason => console.log(reason.message));
  }

}