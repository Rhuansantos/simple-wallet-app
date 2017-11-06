export default class Wallet {

	constructor() {
    this.data = [];
    this.render();
  }

  async loadData() {
      try {
        const transactionList = await fetch('./data/transactionList.json');
        const data = await transactionList.json();
        this.data.push(data);
        return data;
      } catch (e) {
          return e;
      }
  }

  util(n){
    console.log(n);
  }

  createCards(){
    let printContainer = document.querySelector('#cards');
    this.loadData().then((data) => {
      data.map((card, index) => {
        // HTML Template
        let template = `
          <li data-id=${card.id}>
            <img src="./img/visa.png" alt="card" />
            <p>${card.number}</p>
            <p>Valid Thru: ${card.valid}</p>
          </li>
        `;
        // print html
        printContainer.insertAdjacentHTML('afterbegin', template);
      })
    }).catch(reason => console.log(reason.message));
  }

  transactions(_id){
    let printContainer = document.querySelector('#transactionList');
    this.loadData().then((data) => { 
      data['0'].transactions.map((transaction, index) => {
        console.log(transaction);
        let template = `
          <li>
            <div class="transactionIcons"><span class="plus">+</span></div>
            <div>
              <h2>${transaction.store}</h2>
              <p>${transaction.description, transaction.date}</p>
            </div>
            <span class="transactionValue">${transaction.price}</span>
          </li>
        `;
          printContainer.insertAdjacentHTML('afterbegin', template);
      });
    }).catch(reason => console.log(reason.message));
  }
    
  render(){
    this.createCards();
    this.transactions();
  }
  
}