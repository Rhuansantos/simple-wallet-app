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

  createCards(){
    let printContainer = document.querySelector('#cards');
    this.loadData().then((data) => {
      data.map((card, index) => {
        // HTML Template
        let template = `
          <li data-id=${card.id - 1}>
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
    if(_id === undefined){
      _id = 0;
    }
    let printContainer = document.querySelector('#transactionList');
    printContainer.innerHTML = null; // clean the content before insert
    this.loadData().then((data) => { 
      data[_id].transactions.map((transaction, index) => {
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
  }
  
}