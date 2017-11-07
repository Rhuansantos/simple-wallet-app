import Wallet from './wallet';

// waiting for the page loading
window.addEventListener('load',() => {

  const walletApp = Wallet.getInstance();
  
  // listening to event click on the LI element inside of #cards
  document.querySelector('#cards').addEventListener('click', (e) => {
    if(e.target && e.target.nodeName == "LI") {
      const id = e.target.getAttribute('data-id');
      walletApp.transactions(id);
      
      // adding active class to the list
      const elements = document.querySelector('#cards').children;
      for (let i = 0; i < elements.length; ++i) {
          elements[i].classList.remove('active');
      }
      e.target.classList.add('active');
    }
  });

});